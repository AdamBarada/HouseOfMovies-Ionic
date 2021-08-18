import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditScreeningPage } from './edit-screening.page';

const routes: Routes = [
  {
    path: '',
    component: EditScreeningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditScreeningPageRoutingModule {}
