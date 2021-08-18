import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  code =
    '11010010000100111011001011101111011010001110101110011001101110010010111101110111001011001001000011011000111010110001001110111101101001011010111000101101';

  reservation: Reservation;

  option = {
    centeredSlides: true,
    initialSlide: 0,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      if (params.has('id')) {
        this.reservationService
          .getReservationById(+params.get('id'))
          .subscribe((resData) => {
            this.reservation = resData;
          });
      }
    });
  }
}
