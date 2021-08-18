import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  loadedMovies: Movie[] = [];
  trendingMovies: Movie[] = [];
  comingMovies: Movie[] = [];
  moviesSub: Subscription;
  option = {
    centeredSlides: true,
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: {
      disableOnInteraction: true,
      loop: true,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  };

  cardOption = {
    slidesPerView: 2.5,
    spaceBetween: 20,
  };

  constructor(
    private moviesService: MoviesService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });

    this.moviesService.getAllMovies().subscribe(() => {});
    this.moviesService.getComingMovies().subscribe((moviesData) => {
      this.comingMovies = moviesData;
    });
    this.moviesService.getTrendingMovies().subscribe((moviesData) => {
      this.trendingMovies = moviesData;
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });
    this.moviesSub = this.moviesService.movies.subscribe((moviesData) => {
      this.loadedMovies = moviesData;
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

  ngOnDestroy() {
    this.moviesSub?.unsubscribe();
  }
}
