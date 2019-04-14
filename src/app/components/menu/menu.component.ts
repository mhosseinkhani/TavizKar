import { UserService } from "src/app/shared/User.Service";
import { Component, OnInit } from "@angular/core";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  actualVersion: string;
  clientQty = 1250;
  isToken = false;
  constructor(private service: UserService, public toastr: ToastrManager) {
    if (window.localStorage.getItem("token")) {
      this.isToken = true;
    }
  }

  ngOnInit() {
    this.actualVersion = "اتومکانیک اکبر"; //environment.version;
  }

  callMe() {
    const tick = {
      Subject: "درخواست تماس",
      Passage: window.localStorage.getItem("userInfo")
    };
    this.service.addTicket(tick).subscribe(
      res => {
        this.toastr.infoToastr(
          "همکاران ما در سریع ترین زمان ممکن ا شما تماس خواهند گرفت",
          "ارسال",
          {
            toastTimeout: 1500
          }
        );
      },
      error => {}
    );
  }
}
