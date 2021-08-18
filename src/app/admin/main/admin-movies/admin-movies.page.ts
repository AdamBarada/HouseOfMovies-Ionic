import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { IonItemSliding, ToastController } from '@ionic/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from 'src/app/models/movie.model';
import { AdminMoviesService } from 'src/app/services/admin-movies.service';

@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.page.html',
  styleUrls: ['./admin-movies.page.scss'],
})
export class AdminMoviesPage {
  movies: Movie[] = [];
  showedMovies: Movie[] = [];
  currentMovie: number;
  faMinusCircle = faMinusCircle;
  modalRef!: BsModalRef;

  constructor(
    private spinner: NgxSpinnerService,
    private moviesService: AdminMoviesService,
    private router: Router,
    private modalService: BsModalService,
    private toast: ToastController
  ) {}

  ionViewWillEnter() {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    this.movies = [];
    this.requestMovies();
  }

  openTrailer(trailer: string) {
    window.open(trailer);
  }

  requestMovies() {
    this.moviesService.getMovies().subscribe((resData) => {
      this.movies = resData;
      this.addMoreItems();
    });
  }

  addMoreItems() {
    let j = this.showedMovies.length;
    for (let i = j; i < j + 10; i++) {
      if (i == this.movies.length) break;
      this.showedMovies.push(this.movies[i]);
      this.spinner.hide();
    }
  }

  loadData(event: any) {
    setTimeout(() => {
      this.addMoreItems();
      event.target.complete();
    }, 500);
  }

  doRefresh(event: any) {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    this.showedMovies = [];
    this.requestMovies();
  }

  onDeleteMovie(id: number) {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    this.moviesService.deleteMovie(id).subscribe((resData) => {
      let updatedMovies = this.movies.filter((res) => {
        return res.id !== id;
      });
      this.movies = [];
      this.movies.push(...updatedMovies);
      this.showedMovies = [];
      this.addMoreItems();
      this.toast
      .create({
        message: 'Movie Deleted successfully.',
        color: 'success',
        duration: 2000,
      })
      .then((data) => {
        data.present();
      });
    });
    this.modalRef.hide();
  }

  onEditMovie(id: number, trailer?: string) {
    if (trailer !== undefined) {
      this.openTrailer(trailer);
      return;
    } else {
      this.router.navigateByUrl('/admin/movies/edit/' + id);
    }
  }

  openModal(template: TemplateRef<any>, id: number, slidingEl: IonItemSliding) {
    this.currentMovie = id;
    slidingEl.close();
    this.modalRef = this.modalService.show(template, {
      class: "modal-dialog-centered",
    });
  }

  decline(){
    this.modalRef.hide();
  }
}
