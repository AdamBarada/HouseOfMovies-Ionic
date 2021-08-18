import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreeningsSearchPage } from './screenings-search.page';

const routes: Routes = [
  {
    path: '',
    component: ScreeningsSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreeningsSearchPageRoutingModule {}
