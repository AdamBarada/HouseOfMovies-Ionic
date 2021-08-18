import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreeningDetailPage } from './screening-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ScreeningDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreeningDetailPageRoutingModule {}
