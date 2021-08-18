import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreeningsPage } from './screenings.page';

const routes: Routes = [
  {
    path: '',
    component: ScreeningsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreeningsPageRoutingModule {}
