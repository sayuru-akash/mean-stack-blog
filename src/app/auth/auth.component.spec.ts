import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppModule} from "../app.module";
import {By} from "@angular/platform-browser";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should display the spinner when isLoading is true, and hide it when isLoading is false', async(() => {
    component.isLoading = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(spinner).toBeTruthy();
      component.isLoading = false;
      fixture.detectChanges();
      spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(spinner).toBeFalsy();
    });
  }));


  it('should check input fields are hidden if isLoading is true, and input fields are visible if isLoading is false', function () {
    component.isLoading = true;
    fixture.detectChanges();

    expect(de.query(By.css('input[name="email"]'))).toBeFalsy();
    expect(de.query(By.css('input[name="password"]'))).toBeFalsy();
    expect(de.query(By.css('button[type="submit"]'))).toBeFalsy();

    component.isLoading = false;
    fixture.detectChanges();

    expect(de.query(By.css('input[name="email"]'))).toBeTruthy();
    expect(de.query(By.css('input[name="password"]'))).toBeTruthy();
    expect(de.query(By.css('button[type="submit"]'))).toBeTruthy();
  });

  it('should display error messages when form fields are empty', async(() => {
    fixture.detectChanges(); // detect changes to the template
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const submitBtn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    // trigger the form's submit event
    submitBtn.click();
    fixture.detectChanges();

    // check that the email input field is invalid and the email error message is displayed
    expect(emailInput.validity.valueMissing).toBe(true);
    expect(emailInput.validationMessage).toEqual('Please fill in this field.');

    // check that the password input field is invalid and the password error message is displayed
    expect(passwordInput.validity.valueMissing).toBe(true);
    expect(passwordInput.validationMessage).toEqual('Please fill in this field.');
  }));

  it('should display error message when the entered email invalid', async(() => {
    fixture.detectChanges(); // detect changes to the template
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const submitBtn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    // set the email input field to an invalid email address
    emailInput.value = 'test';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // trigger the form's submit event
    submitBtn.click();
    fixture.detectChanges();

    // check that the email input field is invalid and the email error message is displayed
    expect(emailInput.validity.typeMismatch).toBe(true);
    expect(emailInput.validationMessage).toEqual('Please include an \'@\' in the email address. \'test\' is missing an \'@\'.');
  }));

  it('should call the login method when the valid form is submitted', () => {
    fixture.detectChanges(); // detect changes to the template
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const submitBtn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    // set the email and password input fields to valid values
    emailInput.value = 'email@commercial.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // spy on the login method
    spyOn(component, 'onLogin' as never);

    // trigger the form's submit event
    submitBtn.click();
    fixture.detectChanges();

    // check that the login method was called
    expect(component.onLogin).toHaveBeenCalled();
  });
});

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let de;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should display the spinner when isLoading is true, and hide it when isLoading is false', async(() => {
    component.isLoading = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(spinner).toBeTruthy();
      component.isLoading = false;
      fixture.detectChanges();
      spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(spinner).toBeFalsy();
    });
  }));

  it('should check input fields are hidden if isLoading is true, and input fields are visible if isLoading is false', function () {
    component.isLoading = true;
    fixture.detectChanges();

    expect(de.query(By.css('input[name="email"]'))).toBeFalsy();
    expect(de.query(By.css('input[name="password"]'))).toBeFalsy();
    expect(de.query(By.css('button[type="submit"]'))).toBeFalsy();

    component.isLoading = false;
    fixture.detectChanges();

    expect(de.query(By.css('input[name="email"]'))).toBeTruthy();
    expect(de.query(By.css('input[name="password"]'))).toBeTruthy();
    expect(de.query(By.css('button[type="submit"]'))).toBeTruthy();
  });

  it('should display error messages when form fields are empty', async(() => {
    fixture.detectChanges(); // detect changes to the template
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const submitBtn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    // trigger the form's submit event
    submitBtn.click();
    fixture.detectChanges();

    // check that the email input field is invalid and the email error message is displayed
    expect(emailInput.validity.valueMissing).toBe(true);
    expect(emailInput.validationMessage).toEqual('Please fill in this field.');

    // check that the password input field is invalid and the password error message is displayed
    expect(passwordInput.validity.valueMissing).toBe(true);
    expect(passwordInput.validationMessage).toEqual('Please fill in this field.');
  }));

  it('should display error message when the entered email invalid', async(() => {
    fixture.detectChanges(); // detect changes to the template
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const submitBtn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    // set the email input field to an invalid email address
    emailInput.value = 'test';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // trigger the form's submit event
    submitBtn.click();
    fixture.detectChanges();

    // check that the email input field is invalid and the email error message is displayed
    expect(emailInput.validity.typeMismatch).toBe(true);
    expect(emailInput.validationMessage).toEqual('Please include an \'@\' in the email address. \'test\' is missing an \'@\'.');
  }));

  it('should call the signup method when the valid form is submitted', () => {
    fixture.detectChanges(); // detect changes to the template
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const submitBtn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    // set the email and password input fields to valid values
    emailInput.value = 'email@corp.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // spy on the signup method
    spyOn(component, 'onSignup' as never);

    // trigger the form's submit event
    submitBtn.click();
    fixture.detectChanges();

    // check that the signup method was called
    expect(component.onSignup).toHaveBeenCalled();
  });
});
