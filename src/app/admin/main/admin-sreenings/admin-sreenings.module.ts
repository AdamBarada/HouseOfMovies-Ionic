import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSreeningsPageRoutingModule } from './admin-sreenings-routing.module';

import { AdminSreeningsPage } from './admin-sreenings.page';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSreeningsPageRoutingModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [AdminSreeningsPage]
})
export class AdminSreeningsPageModule {}
