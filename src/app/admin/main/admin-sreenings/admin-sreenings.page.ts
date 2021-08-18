import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { IonItemSliding, ToastController } from '@ionic/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Screening } from 'src/app/models/screening.model';
import { AdminScreeningService } from 'src/app/services/admin-screening.service';

@Component({
  selector: 'app-admin-sreenings',
  templateUrl: './admin-sreenings.page.html',
  styleUrls: ['./admin-sreenings.page.scss'],
})
export class AdminSreeningsPage {
  screenings: Screening[] = [];
  showedScreenings: Screening[] = [];
  currentScreening: number;
  faMinusCircle = faMinusCircle;
  modalRef!: BsModalRef;

  constructor(
    private spinner: NgxSpinnerService,
    private screeningsService: AdminScreeningService,
    private router: Router,
    private modalService: BsModalService,
    private toast: ToastController
  ) {}

  ionViewWillEnter() {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    this.screenings = [];
    this.requestScreenings();
  }

  openTrailer(trailer: string) {
    window.open(trailer);
  }

  requestScreenings() {
    this.screeningsService.getScreenings().subscribe((resData) => {
      this.screenings = resData.filter((screening) => {
        return screening.status === 'AVAILABLE';
      });
      this.addMoreItems();
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
    this.showedScreenings = [];
    this.requestScreenings();
  }

  onDeleteScreening(id: number) {
    this.spinner.show(undefined, {
      color: '#4562F2',
      bdColor: '#292B41',
    });
    this.screeningsService.deleteScreening(id).subscribe((resData) => {
      let updatedscreenings = this.screenings.filter((res) => {
        return res.id !== id;
      });
      this.screenings = [];
      this.screenings.push(...updatedscreenings);
      this.showedScreenings = [];
      this.addMoreItems();
      this.modalRef.hide();
      this.toast
      .create({
        message: 'Screening Deleted successfully.',
        color: 'success',
        duration: 2000,
      })
      .then((data) => {
        data.present();
      });
    });
  }

  openModal(template: TemplateRef<any>, id: number, slidingEl: IonItemSliding) {
    this.currentScreening = id;
    slidingEl.close();
    this.modalRef = this.modalService.show(template, {
      class: "modal-dialog-centered",
    });
  }

  decline(){
    this.modalRef.hide();
  }

  onEditScreening(id: number, trailer?: string) {
    if (trailer !== undefined) {
      this.openTrailer(trailer);
      return;
    }
    this.router.navigateByUrl('/admin/screenings/edit/'+ id);
  }
}
