import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreeningsSearchPageRoutingModule } from './screenings-search-routing.module';

import { ScreeningsSearchPage } from './screenings-search.page';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreeningsSearchPageRoutingModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    SharedModule,
    ModalModule.forRoot()
  ],
  declarations: [ScreeningsSearchPage],
})
export class ScreeningsSearchPageModule {}
