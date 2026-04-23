import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: '**',
    redirectTo: '404'
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound)
  }
];
