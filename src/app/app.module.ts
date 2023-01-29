import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularMaterialModule} from "./angular-material.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AuthInterceptor} from "./auth/auth-interceptor";
import {ErrorInterceptor} from "./error/error-interceptor";
import {ErrorComponent} from "./error/error.component";

import { environment } from '../environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {PostsModule} from "./posts/posts.module";
import {AuthModule} from "./auth/auth.module";

const config: SocketIoConfig = { url: environment.socketUrl, options: {transports:['websocket']} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    AuthModule,
    PostsModule,
    SocketIoModule.forRoot(config)
  ],
  exports: [
    HeaderComponent,
    AuthModule,
    PostsModule,
    ErrorComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
