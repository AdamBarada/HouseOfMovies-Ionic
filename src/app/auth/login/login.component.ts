/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerDataService } from 'src/app/services/spinner-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  isOpen: boolean = false;
  isChecked: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private spinnerData: SpinnerDataService,
    private toast: ToastController
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    this.spinner.show(undefined, this.spinnerData.spinner());
    this.authService.login(f.form.value.email, f.form.value.password).subscribe(
      (resData) => {
        if (this.isChecked) {
          localStorage.setItem('token', resData.token);
          localStorage.setItem('isAdmin', resData.admin);
        }
        this.authService.setToken(resData.token);
        this.authService.setStatus(!!resData.admin);
        f.reset();
        if (resData.admin) {
          this.router.navigateByUrl('/admin/home');
        } else this.router.navigateByUrl('/home');
        this.spinner.hide();
      },
      () => {
        f.reset();
        this.spinner.hide();
        this.toast.create({
          message: "Invalid Credentials. Please try another email or password.",
          color:"danger",
          duration: 2000,
        }).then((data) => {
          data.present();
        });
      }
    );
  }

  setChecked(event: any) {
    if (event.target.checked) {
      this.isChecked = true;
    }
  }
}
