import { Component, TemplateRef } from '@angular/core';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { IonItemSliding, ToastController } from '@ionic/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage {
  reservations: Reservation[] = [];
  faMinusCircle = faMinusCircle;
  showedReservations: Reservation[] = [];
  modalRef! : BsModalRef;
  currentReservation: number;

  constructor(
    private spinner: NgxSpinnerService,
    private reservationService: ReservationService,
    private modalService: BsModalService,
    private toast: ToastController
  ) {}

  ionViewWillEnter() {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    this.requestReservations();
  }

  requestReservations(event?: any) {
    this.reservationService.getUserReservations().subscribe(
      (resData) => {
        this.reservations = resData;
        this.addMoreItems(event);
      },
      (errRes) => {
        if (errRes.error.status === 401) {
          // do something
        }
      }
    );
  }

  onDeleteReservation(id: number) {
    this.modalRef.hide();
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    this.reservationService.deleteReservation(id).subscribe(() => {
      this.toast
      .create({
        message: 'Reservation Deleted successfully.',
        color: 'success',
        duration: 2000,
      })
      .then((data) => {
        data.present();
      });
      let updatedReservations = this.reservations.filter((res) => {
        return res.id !== id;
      });
      this.reservations = [];
      this.reservations.push(...updatedReservations);
      this.showedReservations = [];
      this.addMoreItems();
    });
  }

  openModal(template: TemplateRef<any>, id: number, slidingEl: IonItemSliding) {
    this.currentReservation = id;
    slidingEl.close();
    this.modalRef = this.modalService.show(template, {
      class: "modal-dialog-centered",
    });
  }

  decline(){
    this.modalRef.hide();
  }

  addMoreItems(event?: any) {
    let j = this.showedReservations.length;
    for (let i = j; i < j + 10; i++) {
      if (i == this.reservations.length) break;
      this.showedReservations.push(this.reservations[i]);
    }
    event?.target.complete();
    this.spinner.hide();
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
    this.showedReservations = [];
    this.requestReservations(event);
  }
}
