import { Component } from '@angular/core';
import {
  faCalendarDay,
  faChartPie,
  faCheck,
  faFilm,
  faImage,
  faPencilAlt,
  faPlus,
  faPortrait,
  faStopwatch,
  faTimesCircle,
  faTrash,
  faUsers,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { NgForm } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MovieProto } from 'src/app/models/movieProto.model';
import { DatePipe } from '@angular/common';
import { AdminMoviesService } from 'src/app/services/admin-movies.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.page.html',
  styleUrls: ['./edit-movie.page.scss'],
})
export class EditMoviePage {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faFilm = faFilm;
  faCheck = faCheck;
  faUserTie = faUserTie;
  faAdd = faPlus;
  faCalendarDay = faCalendarDay;
  faVideo = faYoutube;
  faChartPie = faChartPie;
  faImage = faImage;
  faStopWatch = faStopwatch;
  faPortrait = faPortrait;
  faUsers = faUsers;
  faTimesCircle = faTimesCircle;
  dropdownSettings: IDropdownSettings = {};
  dropdownList: Category[] = [];
  portraitUrl: string = '';
  landscapeUrl: string = '';
  movie: Movie;
  selectedItems: Category[];
  selectedDate = new Date();

  constructor(
    private categoriesService: CategoryService,
    private moviesService: AdminMoviesService,
    private spinner: NgxSpinnerService,
    private datepipe: DatePipe,
    private toast: ToastController,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });

    this.updateCategories();
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.moviesService
          .getMovieById(+params.get('id'))
          .subscribe((movieData) => {
            this.movie = movieData;
            this.portraitUrl = this.movie.portraitImg;
            this.landscapeUrl = this.movie.landscapeImg;
            this.selectedDate = this.movie.releaseDate;
            this.selectedItems = this.movie.categories;
            this.spinner.hide();
          });
      }
    });
  }

  updateCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.dropdownList = categories;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onSubmit(f: NgForm) {
    let categories: number[] = [];
    f.form.value.categories.forEach((category: Category) => {
      categories.push(category.id);
    });
    let portrait: string | null = this.portraitUrl.includes('http')
      ? ''
      : this.portraitUrl;
    let landscape: string | null = this.landscapeUrl.includes('http')
      ? ''
      : this.landscapeUrl;
    let date: string =
      this.datepipe.transform(f.form.value.date, 'yyyy-MM-dd') || '';

    let updatedMovie: MovieProto;

    updatedMovie = new MovieProto(
      f.form.value.title,
      f.form.value.description,
      f.form.value.director,
      f.form.value.duration,
      f.form.value.video,
      f.form.value.cast,
      date,
      portrait,
      landscape,
      categories
    );

    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    this.moviesService.updateMovie(updatedMovie, this.movie.id).subscribe(
      () => {
        this.spinner.hide();
        this.toast
          .create({
            message: 'Movie edited successfully.',
            color: 'success',
            duration: 2000,
          })
          .then((data) => {
            data.present();
          });
      },
      () => {
        this.onFormNotValid();
        this.spinner.hide();
      }
    );
  }

  onSelectPortrait(e: any) {
    if (e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.portraitUrl = event.target.result;
      };
    }
  }

  onSelectLandscape(e: any) {
    if (e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.landscapeUrl = event.target.result;
      };
    }
  }

  reset(f: NgForm) {
    f.reset();
  }

  onFormNotValid() {
    this.toast
      .create({
        message: 'Invalid Input. Please check your inputs and try again.',
        color: 'danger',
        duration: 2000,
      })
      .then((data) => {
        data.present();
      });
  }
}
