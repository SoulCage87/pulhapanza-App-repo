import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home-module/pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'reset',
    loadComponent: () => import('./auth/pages/reset/reset.page').then( m => m.ResetPage)
  },
];
