import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddScreeningPage } from './add-screening.page';

const routes: Routes = [
  {
    path: '',
    component: AddScreeningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddScreeningPageRoutingModule {}
