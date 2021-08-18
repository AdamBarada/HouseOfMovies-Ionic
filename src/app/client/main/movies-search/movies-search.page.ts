import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-search',
  templateUrl: './movies-search.page.html',
  styleUrls: ['./movies-search.page.scss'],
})
export class MoviesSearchPage {
  movies: Movie[] = [];
  searchString: string;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ionViewWillEnter() {
    this.route.queryParamMap.subscribe((params) => {
      if (params.has('search')) {
        this.spinner.show(undefined, {
          color: '#4562F2',
          bdColor: '#292B41',
        });
        this.searchString = params.get('search');
        this.requestMovies();
      } else this.spinner.hide();
    });
  }

  openTrailer(trailer: string) {
    window.open(trailer);
  }

  requestMovies() {
    this.moviesService
      .getSearchedMovies(this.searchString)
      .subscribe((resData) => {
        if (resData.length === 0) {
          this.spinner.hide();
          return;
        }
        this.movies = resData;
        this.spinner.hide();
      });
  }

  doRefresh(event: any) {
    this.movies = [];
    this.requestMovies();
  }
}
