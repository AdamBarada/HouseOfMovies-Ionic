import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transition: 'translateY(-3rem)', maxHeight: 0, opacity: 0 }),
        animate('300ms', style({ maxHeight: 500, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', maxHeight: 500, opacity: 1 }),
        animate('300ms', style({ maxHeight: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class MainPage implements OnInit {
  isClicked: boolean = false;
  isAuth: boolean = false;

  constructor(private authService: AuthService, private router: Router,private menuCtrl: MenuController) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    if (this.authService.token || localStorage.getItem('token')) {
      this.isAuth = true;
    }
  }

  async openSheet() {
    this.isClicked = !this.isClicked;
  }

  onSubmit(f: NgForm) {
    this.router.navigate(['/movies-search'], {
      queryParams: { search: f.value.search },
    });
  }
}
