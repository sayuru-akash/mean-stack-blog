import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {CommonModule} from "@angular/common";
import {AngularMaterialModule} from "../angular-material.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
  ],
})
export class AuthModule {
}
