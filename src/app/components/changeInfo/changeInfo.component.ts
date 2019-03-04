import { UserService } from "./../../shared/User.Service";
import { AppComponent } from "./../../app.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { ToastrManager } from "ng6-toastr-notifications";
import { Router } from "@angular/router";

@Component({
  selector: "app-change-info",
  templateUrl: "changeInfo.component.html",
  styleUrls: ["./changeInfo.component.css"]
})
export class ChangeInfoComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public toastr: ToastrManager,
    private usreService: UserService,
    private router: Router
  ) {
    const user: any = JSON.parse(window.localStorage.getItem("userInfo"));
    this.fullName = user.FullName;
    this.description = user.Description;
  }

  public fullName: any;
  public description: any;

  ngOnInit() {}

  doUpdate() {
    this.http
      .post(environment.main_api_url + "/Account/ChangeInfo", {
        FullName: this.fullName,
        Description: this.description
      })
      .toPromise()
      .then(res => {
        this.toastr.successToastr("اطلاعات شما بروز گردید", "ثبت");
        this.getInfo();
      })
      .catch(error => {
        this.toastr.errorToastr("متاسفانه خطایی رخ داده است", "خطا");
      });
  }
  private getInfo() {
    this.usreService.getUserSummery().subscribe(
      res => {
        // AppComponent.userInfo = res;
        window.localStorage.setItem("userInfo", JSON.stringify(res));
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(["/login"]);
        }
      }
    );
  }
}
