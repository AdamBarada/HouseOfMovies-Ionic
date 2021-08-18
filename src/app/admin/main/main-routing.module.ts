import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: '',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./admin-home/admin-home.module').then( m => m.AdminHomePageModule)
  },
  {
    path: 'screenings',
    loadChildren: () => import('./admin-sreenings/admin-sreenings.module').then( m => m.AdminSreeningsPageModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./admin-movies/admin-movies.module').then( m => m.AdminMoviesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
