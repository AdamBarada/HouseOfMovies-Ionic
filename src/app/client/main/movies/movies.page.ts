import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage {
  movies: Movie[] = [];
  showedMovies: Movie[] = [];
  show = false;
  moviesSub: Subscription;

  constructor(
    private spinner: NgxSpinnerService,
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    this.requestMovies();
    this.moviesSub = this.moviesService.movies.subscribe((moviesData) => {
      if (moviesData.length != 0) {
        this.movies = moviesData;
        this.addMoreItems();
      }
    });
  }

  requestMovies() {
    this.moviesService.getAllMovies().subscribe((moviesData) => {
      this.movies = moviesData;
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

  openTrailer(trailer: string) {
    window.open(trailer);
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

  ngOnDestroy(): void {
    this.moviesSub?.unsubscribe();
  }
}
