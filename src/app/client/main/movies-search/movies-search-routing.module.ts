import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesSearchPage } from './movies-search.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesSearchPageRoutingModule {}
