import {Component, OnDestroy, OnInit} from "@angular/core";
import {Post} from "../post.model";
import {PostsService} from "../posts.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {mimeTypeValidator} from "./mime-type.validator";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy{
  private mode = 'create';
  private postId: string;
  private authStatusSub: Subscription;
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService){}

  ngOnInit() {
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
        this.isLoading = false;
      });
      this.form = new FormGroup({
        'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
        'content': new FormControl(null, {validators: [Validators.required, Validators.minLength(10)]}),
        'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeTypeValidator]})
      });
      this.route.paramMap.subscribe((paramMap) => {
        if (paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.isLoading = true;
          this.postsService.getPost(this.postId).subscribe(postData => {
            this.isLoading = false;
            this.post = {id: postData._id, title: postData.title, content: postData.content, imagePath: postData.imagePath, creator: postData.creator};
            this.form.setValue({'title': this.post.title, 'content': this.post.content, 'image': this.post.imagePath})
          });
        } else {
          this.mode = 'create';
          this.postId = null;
        }
      });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    const form = this.form;
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content, form.value.image);
    }else{
      this.postsService.updatePost(this.postId, form.value.title, form.value.content, form.value.image);
    }
    form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
