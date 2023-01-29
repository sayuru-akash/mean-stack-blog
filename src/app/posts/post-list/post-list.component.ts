import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Post} from "../post.model";
import {PostsService} from "../posts.service";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
  })
export class PostListComponent implements OnInit, OnDestroy{
    @Input() posts: Post[] = [];
    isLoading = false;
    totalPosts = 0;
    postsPerPage = 5;
    currentPage = 1;
    pageSizeOptions = [5, 10, 25];
    userIsAuthenticated = false;
    userId: string;
    private postsSub: Subscription;
    private authStatusSub: Subscription;

    constructor(public postsService: PostsService, private authService: AuthService){}

    onChangedPage(pageData: PageEvent) {
      this.isLoading = true;
      this.currentPage = pageData.pageIndex + 1;
      this.postsPerPage = pageData.pageSize;
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }
    onDelete(postId: string) {
      this.postsService.deletePost(postId).subscribe(() => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      }, () => {
        this.isLoading = false;
      });
    }

    ngOnInit() {
      this.isLoading = true;
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
      this.userId = this.authService.getUserId();
      this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authService.getAuthStatusListener().subscribe((isAuthenticated: boolean) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    }

    ngOnDestroy() {
      this.postsSub.unsubscribe();
    }
}
