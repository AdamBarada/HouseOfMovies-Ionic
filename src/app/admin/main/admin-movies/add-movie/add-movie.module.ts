import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMoviePageRoutingModule } from './add-movie-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddMoviePage } from './add-movie.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMoviePageRoutingModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ],
  declarations: [AddMoviePage]
})
export class AddMoviePageModule {}
