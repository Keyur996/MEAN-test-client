import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { BlogComponent } from './blog/blog.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { ToolbarComponent } from './common/toolbar/toolbar.component';
import {AuthService} from './auth/auth.service';
import {UsersService} from './auth/users.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiPrefixInterceptor} from './common/api-prefix.interceptor';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import {BlogService} from './blog/blog.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BlogComponent,
    NotFoundComponent,
    ToolbarComponent,
    BlogListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [AuthService, UsersService, BlogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
