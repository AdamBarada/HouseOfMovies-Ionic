import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreeningDetailPageRoutingModule } from './screening-detail-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ScreeningDetailPage } from './screening-detail.page';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    SharedModule,
    ModalModule.forRoot(),
    ScreeningDetailPageRoutingModule
  ],
  declarations: [ScreeningDetailPage]
})
export class ScreeningDetailPageModule {}
