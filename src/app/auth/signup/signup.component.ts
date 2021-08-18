import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerDataService } from 'src/app/services/spinner-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;

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
    this.authService
      .signup(
        f.form.value.firstName,
        f.form.value.lastName,
        f.form.value.email,
        f.form.value.password
      )
      .subscribe(
        () => {
          this.authService
            .login(f.form.value.email, f.form.value.password)
            .subscribe((resData) => {
              localStorage.setItem('token', resData.token);
              localStorage.setItem('isAdmin', resData.admin);
              this.authService.setToken(resData.token);
              this.authService.setStatus(!!resData.admin);
              f.reset();
              if (resData.admin) {
                this.router.navigateByUrl('/admin/home');
              } else {
                this.router.navigateByUrl('/home');
              }
            });
          f.reset();
          this.spinner.hide();
        },
        (errRes) => {
          this.spinner.hide();
          this.toast.create({
            message: "Email already in use. Sign in instead?",
            color:"danger",
            duration: 2000,
          }).then((data) => {
            data.present();
          });
        }
      );
  }
}
