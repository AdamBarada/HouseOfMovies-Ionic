import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movie: Movie;
  moviesSub: Subscription;
  faUsers = faUsers;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    let id: number | string;
    this.route.paramMap.subscribe((params) => {
      if (!params.has('id')) {
        this.router.navigate(['./home']);
        return;
      }
      id = params.get('id') || 1;
      this.moviesSub = this.moviesService.movies.subscribe((resData) => {
        let res: any;
        res = resData.find((movies) => {
          return movies.id === id;
        });
        if (res) this.movie = res;
        if (!this.movie) {
          this.moviesSub = this.moviesService
            .getMovieById(+id)
            .subscribe((resData) => {
              this.movie = resData;
              this.spinner.hide();
            });
        } else this.spinner.hide();
      });
    });
  }

  printCategories(categories: Category[]) {
    let text = '';
    categories.forEach((category) => {
      text += category.name + ', ';
    });
    let index = text.lastIndexOf(',');
    text = text.substring(0, index);
    return text;
  }

  openTrailer(trailer: string) {
    window.open(trailer);
  }

  goToMovie(id: number) {
    this.router.navigateByUrl('/movies/' + id);
  }

  ngOnDestroy(): void {
    this.moviesSub?.unsubscribe();
  }
}
