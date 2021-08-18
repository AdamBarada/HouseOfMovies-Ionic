import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreeningsPageRoutingModule } from './screenings-routing.module';

import { ScreeningsPage } from './screenings.page';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxSpinnerModule,
    ScreeningsPageRoutingModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  declarations: [ScreeningsPage]
})
export class ScreeningsPageModule {}
