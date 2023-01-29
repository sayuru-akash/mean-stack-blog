import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppModule} from "../app.module";
import {By} from "@angular/platform-browser";
import {PostCreateComponent} from "./post-create/post-create.component";
import {PostListComponent} from "./post-list/post-list.component";

describe('PostCreateComponent',  () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;
  let de;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppModule
      ],
      declarations: [
        PostCreateComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should check input fields are hidden if isLoading is true, and input fields are visible if isLoading is false', function () {
    component.isLoading = true;
    fixture.detectChanges();
    expect(de.query(By.css('input[name="title"]'))).toBeFalsy();
    expect(de.query(By.css('input[name="content"]'))).toBeFalsy();
    expect(de.query(By.css('button[type="submit"]'))).toBeFalsy();

    component.isLoading = false;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(de.query(By.css('input[name="title"]'))).toBeTruthy();
      expect(de.query(By.css('input[name="content"]'))).toBeTruthy();
      expect(de.query(By.css('button[type="submit"]'))).toBeTruthy();
    });
  });

  it('should display error messages when form fields are empty', () => {
    component.isLoading = false;
    fixture.detectChanges();

    fixture.componentInstance.form.get('title').setValue('');
    fixture.componentInstance.form.get('content').setValue('');
    fixture.componentInstance.form.get('title').markAsTouched();
    fixture.componentInstance.form.get('content').markAsTouched();
    fixture.detectChanges();

    component.isLoading = false;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('mat-error'))).toBeTruthy();
    });

    expect(fixture.debugElement.query(By.css('mat-error')).nativeElement.textContent).toMatch('Title is required');
    expect(fixture.debugElement.queryAll(By.css('mat-error'))[1].nativeElement.textContent).toMatch('Content is required');
  });

  it('should check if spinner is displayed when isLoading is true, and not displayed when isLoading is false', () => {
    component.isLoading = true;
    fixture.detectChanges();
    let spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();

    component.isLoading = false;
    fixture.detectChanges();
    spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeFalsy();
  });

  it('should display selected image in preview when selected, else the preview is hidden', ()=> {
    const file = new File(['dummy content'], 'dummy.png', { type: 'image/png' });
    const imagePreview = fixture.debugElement.query(By.css('.image-preview'));

    fixture.detectChanges();
    expect(imagePreview).toBeFalsy();

    fixture.componentInstance.form.value.file = file;

    fixture.whenStable().then(() => {
      expect(imagePreview).toBeTruthy();
      expect(imagePreview.nativeElement.src).toContain('dummy.png');
    });
  });

  it('should call onSavePost when form is valid and submitted', () => {
    spyOn(component, 'onSavePost' as never); // create a spy on the onSavePost method
    const file = new File(['dummy content'], 'dummy.png', { type: 'image/png' });

    component.form.controls['title'].setValue('test title');
    component.form.controls['content'].setValue('test content is longer');
    fixture.componentInstance.form.value.file = file;
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.nativeElement.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.form.valid).toBeTruthy(); // assert that the form is valid
    });
    expect(component.onSavePost).toHaveBeenCalled(); // assert that the spy was called
  });

  it('should identify as invalid submission when the inputs are invalid', () => {
    spyOn(component, 'onSavePost' as never); // create a spy on the onSavePost method

    component.form.controls['title'].setValue('');
    component.form.controls['content'].setValue('');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.form.valid).toBeFalsy(); // assert that the form is invalid
  });

  it('should call onImagePicked when an image is selected', () => {
    spyOn(component, 'onImagePicked' as never); // create a spy on the onImagePicked method
    const file = new File(['dummy content'], 'dummy.png', {type: 'image/png'});
    const imageInput = fixture.debugElement.query(By.css('input[type="file"]'));
    imageInput.triggerEventHandler('change', {target: {files: [file]}});
    fixture.detectChanges();

    expect(component.onImagePicked).toHaveBeenCalled(); // assert that the spy was called
  });

});

describe('PostListComponent',  () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let de;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppModule
      ],
      declarations: [
        PostListComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should display a spinner if isLoading is true and hidden if isLoading is false', () => {
    component.isLoading = true;
    fixture.detectChanges();
    let spinner = de.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();

    component.isLoading = false;
    fixture.detectChanges();
    spinner = de.query(By.css('mat-spinner'));
    expect(spinner).toBeFalsy();
  });

  it('should display "No posts added yet!" message when there are no posts and isLoading is false', () => {
    component.posts = [];
    component.isLoading = false;
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('.info-text')).nativeElement;
    expect(messageElement.textContent).toContain('No posts added yet!');
  });

  it('should display a list of posts when there are posts and isLoading is false', () => {
    component.posts = [
      {
        id: '1',
        title: 'test title',
        content: 'test content',
        imagePath: 'test image path',
        creator: 'test creator'
      }
    ];
    component.totalPosts = 1;
    component.isLoading = false;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      component.posts.forEach(() => {
        const postElement = fixture.debugElement.query(By.css('app-post-item'));
        expect(postElement).toBeTruthy();
      });
    });

    const messageElement = fixture.debugElement.query(By.css('.info-text'));
    expect(messageElement).toBeFalsy();
  });

  it('should display a paginator when there are posts and isLoading is false', () => {
    component.posts = [
      {
        id: '1',
        title: 'test title',
        content: 'test content',
        imagePath: 'test image path',
        creator: 'test creator'
      }
    ];
    component.totalPosts = 1;
    component.isLoading = false;
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.css('mat-paginator'));
    expect(paginator).toBeTruthy();
  });

  it('should display "edit" and "delete" buttons only for the authenticated user who created the post', async () => {
    component.userIsAuthenticated = true;
    component.userId = '1';
    component.posts = [
      {
        id: '1',
        title: 'test title',
        content: 'test content',
        imagePath: 'test image path',
        creator: '1'
      },
      {
        id: '2',
        title: 'test title',
        content: 'test content',
        imagePath: 'test image path',
        creator: '1'
      }
    ];
    component.totalPosts = 2;
    component.isLoading = false;
    fixture.detectChanges();

    const editButton = fixture.debugElement.queryAll(By.css('a[mat-button]'))[0];
    const deleteButton = fixture.debugElement.queryAll(By.css('button[mat-button]'))[0];
    fixture.detectChanges();

    expect(editButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();

    component.userIsAuthenticated = false;
    fixture.detectChanges();

    component.userIsAuthenticated = true;
    component.userId = '2';
    fixture.detectChanges();

    const editButton2 = fixture.debugElement.queryAll(By.css('a[mat-button]'))[0];
    const deleteButton2 = fixture.debugElement.queryAll(By.css('button[mat-button]'))[0];
    fixture.detectChanges();

    expect(editButton2).toBeFalsy();
    expect(deleteButton2).toBeFalsy();
  });

  it('should call onDelete() when the "delete" button is clicked by valid user', () => {
    component.userIsAuthenticated = true;
    component.userId = '1';
    component.posts = [
      {
        id: '1',
        title: 'test title',
        content: 'test content',
        imagePath: 'test image path',
        creator: '1'
      },
      {
        id: '2',
        title: 'test title',
        content: 'test content',
        imagePath: 'test image path',
        creator: '1'
      }
    ];
    component.totalPosts = 2;
    component.isLoading = false;
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.queryAll(By.css('button[mat-button]'))[0];
    fixture.detectChanges();

    spyOn(component, 'onDelete' as never);
    fixture.detectChanges();

    deleteButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.onDelete).toHaveBeenCalled();
  });

});
