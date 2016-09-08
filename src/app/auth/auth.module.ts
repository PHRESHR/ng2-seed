import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AuthComponent }   from './auth.component';
import { CurrentUserComponent } from './current-user/current-user.component';
import { LoginButtonsComponent } from './login-buttons/login-buttons.component';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/unauth.guard';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    AuthComponent,
    CurrentUserComponent,
    LoginButtonsComponent
  ],
  declarations: [
    AuthComponent,
    CurrentUserComponent,
    LoginButtonsComponent
  ],
  providers: [
    AuthGuard,
    UnAuthGuard
  ],
})
export class AuthModule { }
