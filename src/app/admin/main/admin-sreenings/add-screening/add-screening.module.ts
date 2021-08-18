import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { AddScreeningPageRoutingModule } from './add-screening-routing.module';
import { AddScreeningPage } from './add-screening.page';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddScreeningPageRoutingModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  declarations: [AddScreeningPage]
})
export class AddScreeningPageModule {}
