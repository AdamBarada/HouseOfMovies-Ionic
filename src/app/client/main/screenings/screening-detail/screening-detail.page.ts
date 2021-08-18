import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheckCircle, faFilm, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reservation } from 'src/app/models/reservation.model';
import { Screening } from 'src/app/models/screening.model';
import { Seat } from 'src/app/models/seat.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { ScreeningService } from 'src/app/services/screening.service';

@Component({
  selector: 'app-screening-detail',
  templateUrl: './screening-detail.page.html',
  styleUrls: ['./screening-detail.page.scss'],
})
export class ScreeningDetailPage {
  screening: Screening;
  id: number | string;
  totalSeats = 0;
  totalPrice = 0;
  reservation: Reservation;
  faFilm = faFilm;
  faCircleCheck= faCheckCircle;
  rightArrow = faLongArrowAltRight;
  modalRef!: BsModalRef;

  constructor(
    private spinner: NgxSpinnerService,
    private screeningService: ScreeningService,
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private modalService: BsModalService,
  ) {
  }

  ionViewWillEnter() {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });

    this.route.paramMap.subscribe((params) => {
      if (!params.has('id')) {
        this.router.navigate(['./home']);
        return;
      }
      this.id = params.get('id') || '1';
      this.screeningService.getScreeningDetail(+this.id).subscribe(
        (resData) => {
          this.screening = resData;
          this.spinner.hide();
        },
        (errorRes) => {
          this.spinner.hide();
          this.router.navigateByUrl('/error/accessDenied');
        }
      );
    });
    this.spinner.hide();
  }

  onSelect(i: number, j: number) {
    const position = i * (this.screening?.room?.nbColumns || 0) + j;
    if (this.screening?.room?.seats?.[position]?.taken) return;
    let state: boolean =
      this.screening?.room?.seats?.[position]?.isSelected || false;
    if (this.screening?.room.seats[position].isSelected !== undefined)
      this.screening.room.seats[position].isSelected = !state;
    if (!state) {
      this.totalSeats++;
      this.totalPrice += this.screening?.price || 0;
    } else {
      this.totalSeats--;
      this.totalPrice -= this.screening?.price || 0;
    }
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: "modal-dialog-centered",
    });
  }

  setStyle(i: number, j: number) {
    const position = i * (this.screening?.room?.nbColumns || 0) + j;

    let takenStyle = {
      fill: '#FE2525',
      cursor: 'not-allowed',
    };

    let availableStyle = {
      fill: '#707070',
    };

    let selectedStyle = {
      fill: '#4562F2',
    };

    if (this.screening?.room?.seats?.[position]?.taken) return takenStyle;

    return this.screening?.room?.seats?.[position]?.isSelected
      ? selectedStyle
      : availableStyle;
  }

  openTrailer(trailer: string) {
    window.open(trailer);
  }

  onAddReservation(template: TemplateRef<any>) {
    if (this.totalSeats === 0) return;
    this.spinner.show(undefined, {
      color: '#4562F2',
    });
    let seatIds: Seat[] =
      this.screening?.room?.seats?.filter((seat) => {
        return seat.isSelected;
      }) || [];
    let ids: number[] = [];
    seatIds.forEach((seat) => {
      ids.push(seat.id);
    });
    this.reservationService
      .addReservation(+this.id, ids)
      .subscribe((resData) => {
        this.reservation = resData;
        this.reservation?.seatsReserved.forEach((seat) => {
          for (let i = 0; i < (this.screening?.room.seats.length || 0); i++) {
            if (this.screening?.room.seats[i].id === seat.id) {
              this.screening.room.seats[i].taken = true;
              this.screening.room.seats[i].isSelected = false;
            }
            this.totalPrice = 0;
            this.totalSeats = 0;
          }
        });
        this.spinner.hide();
        this.modalRef = this.modalService.show(template, {
          class: "modal-dialog-centered",
        });
      });
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
