import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgetPasswordComponent } from './features/forget-password/forget-password.component';
import { FeedComponent } from './features/feed/feed.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { authGuard } from './core/auth/guards/auth-guard';
import { guestGuard } from './core/auth/guards/guest-guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', component: AuthLayoutComponent,canActivate:[guestGuard] , children: [
      { path: 'login', component: LoginComponent , title: 'Login'},
      { path: 'register', component: RegisterComponent , title: 'Register'},
      { path: 'forgetPassword', component: ForgetPasswordComponent, title: 'Forget Password'},
    ]
  },
  {
    path: '', component: MainLayoutComponent , canActivate: [authGuard] , children: [
      { path: 'feed', component: FeedComponent , title: 'Feed'},
      { path: 'notification', component: NotFoundComponent , title: 'Notification'},
      { path: 'profile', component: ProfileComponent , title: 'Profile'},
      { path: 'change', component: ChangePasswordComponent , title: 'Change Password'},
    ]

  },
  {path: '**', component: NotFoundComponent , title: 'Not Found'},
];
