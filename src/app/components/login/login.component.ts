import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { ToastrManager } from "ng6-toastr-notifications";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isResend = false;
  constructor(
    private http: HttpClient,
    public toastr: ToastrManager,
    private router: Router
  ) {}

  public mobile: any;
  public activeCode: any;
  activeMode = false;
  timer: any = [2, 59];
  ngOnInit() {}

  doLogin() {
    if (!this.activeMode) {
      this.http
        .post(environment.main_api_url + "/Account/Login", {
          PhoneNumber: "0" + this.mobile,
          UserType: 1
        })
        .toPromise()
        .then(res => {
          this.timer = [1, 60];
          this.timerStart();
          this.toastr.successToastr(
            "کد ورود به برنامه برای شما ارسال گردید.",
            "ثبت"
          );
          this.activeMode = true;
        })
        .catch(error => {
          this.toastr.errorToastr("متاسفانه خطایی رخ داده است", "خطا");
        });
    } else {
      this.http
        .post(
          environment.main_api_url +
            "/Account/Activation?phoneNumber=0" +
            this.mobile +
            "&code=" +
            this.activeCode,
          null
        )
        .toPromise()
        .then(res => {
          window.localStorage.setItem("token", res.toString());
          this.router.navigate(["/"]);
        })
        .catch(error => {
          this.toastr.errorToastr(" کد ارسالی صحیح نیست ", "خطا");
        });
    }
  }

  resend() {
    this.http
      .post(environment.main_api_url + "/Account/Login", {
        PhoneNumber: "0" + this.mobile,
        UserType: 1
      })
      .toPromise()
      .then(res => {
        this.timer = [1, 60];
        this.timerStart();
        this.toastr.successToastr(
          "کد ورود به برنامه برای شما ارسال گردید.",
          "ثبت"
        );
        this.activeMode = true;
      })
      .catch(error => {
        this.toastr.errorToastr("متاسفانه خطایی رخ داده است", "خطا");
      });
  }

  timerStart() {
    setInterval(() => {
      if (this.timer[1] !== 0 && this.timer[0] !== 0) {
        this.timer[1] = this.timer[1] - 1;
        if (this.timer[1] === 0) {
          this.timer[0] = this.timer[0] - 1;
          this.timer[1] = 59;
        }
      } else {
        this.isResend = true;
      }
    }, 1000);
  }
}
