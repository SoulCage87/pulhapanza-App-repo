import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuardService } from './auth/services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'reset',
    loadComponent: () => import('./auth/pages/reset/reset.page').then(m => m.ResetPage)
  },
  {
    path: '',
    loadChildren: () => import('./shared/ui/pages/tabs-page/tabs.routes').then(m => m.routes),
    canActivate: [() => inject(AuthGuardService).canActive()]
  },  {
    path: 'gemini',
    loadComponent: () => import('./gemini/pages/gemini/gemini.page').then( m => m.GeminiPage)
  }


];
