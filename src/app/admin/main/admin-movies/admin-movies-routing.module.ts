import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminMoviesPage } from './admin-movies.page';

const routes: Routes = [
  {
    path: '',
    component: AdminMoviesPage,
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./add-movie/add-movie.module').then(
        (m) => m.AddMoviePageModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit-movie/edit-movie.module').then( m => m.EditMoviePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMoviesPageRoutingModule {}
