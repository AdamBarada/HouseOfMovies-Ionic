import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { faDollarSign, faTicketAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { MenuController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from 'src/app/models/movie.model';
import { PieData } from 'src/app/models/PieData.model';
import { IUserResponseData } from 'src/app/models/responses/IUserResponseData.model';
import { AdminMoviesService } from 'src/app/services/admin-movies.service';
import { AdminReservationService } from 'src/app/services/admin-reservation.service';
import { AdminUserService } from 'src/app/services/admin-user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage{

  faDollar = faDollarSign;
  faTicket = faTicketAlt;
  faUsers = faUsers;
  chartsData: any;
  totalRes: number = 0;
  income: number = 0;
  loyalUsers: IUserResponseData[] = [];
  pieChartData: PieData[] = [];
  bestSellingMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];

  constructor(
    private moviesService: AdminMoviesService,
    private usersService: AdminUserService,
    private reservationService: AdminReservationService,
    private spinner: NgxSpinnerService,
    public datepipe: DatePipe,
    private menuCtrl: MenuController
  ) {}

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
  }

  ngOnInit(): void {
    this.spinner.show(undefined, {
      color: "#4562F2",
      bdColor: "#292B41",
    });

    this.usersService.getLoyalUsers().subscribe((data) => {
      this.loyalUsers = data;
    });

    this.reservationService.getReservationsDetails().subscribe((data) => {
      this.income = data.totalIncome;
      this.totalRes = data.totalNumber;
    });

    this.moviesService.getUpcomingMovies().subscribe((moviesData) => {
      this.upcomingMovies = moviesData;
      this.moviesService.getMoviesDistribution().subscribe((data) => {
        this.pieChartData = data;
      });
    });

    this.moviesService.getTrendingMovies().subscribe((moviesData) => {
      this.bestSellingMovies = moviesData;
      this.reservationService.getReservationsChartData().subscribe((data) => {
        this.chartsData = data;
        this.spinner.hide();
      });
    });

  }

}
