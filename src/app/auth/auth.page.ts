import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  constructor(private menuCtrl: MenuController) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }
}
