import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Screening } from 'src/app/models/screening.model';
import { AuthService } from 'src/app/services/auth.service';
import { ScreeningService } from 'src/app/services/screening.service';

@Component({
  selector: 'app-screenings-search',
  templateUrl: './screenings-search.page.html',
  styleUrls: ['./screenings-search.page.scss'],
})
export class ScreeningsSearchPage {

  screenings: Screening[] = [];
  showedScreenings: Screening[] = [];
  show = false;
  faMinusCircle = faMinusCircle;
  movieTitle : string;
  id: number;
  modalRef!: BsModalRef;
  isAuth = false;

  constructor(
    private spinner: NgxSpinnerService,
    private screeningService: ScreeningService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private authService: AuthService
  ) {}

  ionViewWillEnter() {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    if (this.authService.token || localStorage.getItem('token')) {
      this.isAuth = true;
    }
    this.requestScreenings();
  }

  requestScreenings() {
    this.route.queryParamMap.subscribe((params) => {
      this.screeningService.getScreenings().subscribe((resData) => {
        if (params.has('movie')) {
          this.screenings = resData.filter((movie) => {
            this.movieTitle = params.get('movie');
            return movie.movie.title === params.get('movie');
          });
        } else this.screenings = resData;
        this.id = this.screenings[0].movie.id;
        this.addMoreItems();
      });
    });
  }

  addMoreItems() {
    let j = this.showedScreenings.length;
    for (let i = j; i < j + 10; i++) {
      if (i == this.screenings.length) break;
      this.showedScreenings.push(this.screenings[i]);
      this.spinner.hide();
    }
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
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
    this.showedScreenings = [];
    this.requestScreenings();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: "modal-dialog-centered",
    });
  }

}
