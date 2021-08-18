import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSreeningsPage } from './admin-sreenings.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSreeningsPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add-screening/add-screening.module').then( m => m.AddScreeningPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit-screening/edit-screening.module').then( m => m.EditScreeningPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSreeningsPageRoutingModule {}
