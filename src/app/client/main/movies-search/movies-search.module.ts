import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesSearchPageRoutingModule } from './movies-search-routing.module';

import { MoviesSearchPage } from './movies-search.page';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesSearchPageRoutingModule,
    NgxSpinnerModule,
    SharedModule,
  ],
  declarations: [MoviesSearchPage]
})
export class MoviesSearchPageModule {}
