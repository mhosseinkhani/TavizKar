import { UserService } from "./../../shared/User.Service";
import { AppComponent } from "./../../app.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment.prod";
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
    private usreService: UserService
  ) {
    this.fullName = AppComponent.userInfo.FullName;
    this.description = AppComponent.userInfo.Description;
  }

  public fullName: any;
  public description: any;

  ngOnInit() {

  }

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
    this.usreService.getUserSummery().subscribe(res => {
      AppComponent.userInfo = res;
    });
  }
}
