import { Component } from '@angular/core';

import {
  faCalendarDay,
  faCheck,
  faDollarSign,
  faDoorOpen,
  faFilm,
  faPencilAlt,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { AdminScreeningService } from 'src/app/services/admin-screening.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgForm } from '@angular/forms';
import { ScreeningProto } from 'src/app/models/screeningProto.model';
import { Movie } from 'src/app/models/movie.model';
import { Room } from 'src/app/models/room.model';
import { AdminMoviesService } from 'src/app/services/admin-movies.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { Screening } from 'src/app/models/screening.model';
import { ActivatedRoute } from '@angular/router';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-edit-screening',
  templateUrl: './edit-screening.page.html',
  styleUrls: ['./edit-screening.page.scss'],
})
export class EditScreeningPage {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faTimesCircle = faTimesCircle;
  isChecked = false;
  faAdd = faPlus;
  faCalendarDay = faCalendarDay;
  faFilm = faFilm;
  faDollar = faDollarSign;
  faDoorOpen = faDoorOpen;
  faCheck = faCheck;
  dropdownSettings: IDropdownSettings = {};
  isTimeValid: boolean = false;
  movies: Movie[] = [];
  rooms: Room[] = [];
  screening: Screening;
  selectedDate = new Date();
  selectedTime = new Date();
  dropdownMovieList: { id: number; name: string }[] = [];
  dropdownRoomList: { id: number; name: string }[] = [];
  selectedMovieItems: { id: number; name: string }[] = [];
  selectedScreeningItems: { id: number; name: string }[] = [];

  constructor(
    private screeningsService: AdminScreeningService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toast: ToastController,
    private moviesService: AdminMoviesService,
    private roomsService: RoomsService
  ) {}

  ionViewWillEnter() {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });

    this.dropdownSettings = {
      singleSelection: true,
      closeDropDownOnSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.loadMovies();
    this.loadRooms();
    this.loadScreening();
  }

  loadMovies() {
    if (this.movies.length == 0) {
      this.moviesService.getMovies().subscribe((moviesData) => {
        this.movies = moviesData;
        this.movies.forEach((movie: Movie) => {
          let id = movie.id;
          let name = movie.title;
          this.dropdownMovieList.push({ id, name });
          this.spinner.hide();
        });
      });
    }
  }

  loadScreening() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.screeningsService
          .getScreeningById(+params.get('id'))
          .subscribe((screeningData) => {
            this.screening = screeningData;
            this.selectedDate = this.screening.date;
            let id = this.screening.movie.id;
            let name = this.screening.movie.title;
            this.selectedMovieItems.push({ id, name });
            id = this.screening.room.id;
            name = this.screening.room.name;
            this.selectedScreeningItems.push({ id, name });
            this.selectedTime.setHours(this.selectedDate.getHours());
            this.selectedTime.setMinutes(this.selectedDate.getMinutes());
          });
      }
    });
  }

  loadRooms() {
    if (this.rooms.length == 0) {
      this.roomsService.getRooms().subscribe((rooms) => {
        this.rooms = rooms;
        this.rooms.forEach((room: Room) => {
          let id = room.id;
          let name = room.name;
          this.dropdownRoomList.push({ id, name });
        });
      });
    }
  }

  setValid(event: boolean) {
    this.isTimeValid = event;
  }

  reset(f: NgForm) {
    f.reset();
  }

  onSubmit(f: NgForm) {
    let newScreening: ScreeningProto;
    newScreening = new ScreeningProto(
      f.form.value.movie[0].id,
      f.form.value.room[0].id,
      f.form.value.price,
      f.form.value.date.getDate(),
      f.form.value.date.getMonth() + 1,
      f.form.value.date.getFullYear(),
      f.form.value.time.getHours(),
      f.form.value.time.getMinutes(),
      f.form.value.time.getSeconds()
    );
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    this.screeningsService.editScreening(newScreening, this.screening.id).subscribe(
      (data) => {
        console.log(newScreening, data);
        this.spinner.hide();
        this.onFormAccepted(f);
      },
      () => {
        this.spinner.hide();
        this.onFormNotValid();
      }
    );
  }

  onFormAccepted(f: NgForm) {
    f.reset();
    this.spinner.hide();
    this.toast
      .create({
        message: 'Screening added successfully.',
        color: 'success',
        duration: 2000,
      })
      .then((data) => {
        data.present();
      });
  }

  onFormNotValid() {
    this.toast
      .create({
        message:
          'Conflit in time. Screening occuring at the same time already exists. Change time and try again',
        color: 'danger',
        duration: 2000,
      })
      .then((data) => {
        data.present();
      });
  }
}
