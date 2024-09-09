import { Routes } from '@angular/router';
import { TabsPagePage } from './tabs-page.page';

export const routes: Routes = [
    {
       path: 'tabs',
       component: TabsPagePage,
       children: [
        {
            path: 'home',
            loadComponent: () => import('../../../../home-module/pages/home/home.page').then((m) => m.HomePage),
           
          },
          {
            path: 'gallery',
            loadComponent: () => import('../../../../gallery/pages/gallery/gallery.page').then((m) => m.GalleryPage), 
          },
          {
            path: 'profile',
            loadComponent: () => import('../../../../profile/pages/profile/profile.page').then((m) => m.ProfilePage),
          }
       ]
    },
    {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
    }
    
];
