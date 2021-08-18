import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminMoviesPageRoutingModule } from './admin-movies-routing.module';

import { AdminMoviesPage } from './admin-movies.page';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminMoviesPageRoutingModule,
    NgxSpinnerModule,
    SharedModule,
    FontAwesomeModule,
    ModalModule.forRoot()
  ],
  declarations: [AdminMoviesPage]
})
export class AdminMoviesPageModule {}
