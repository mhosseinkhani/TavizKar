import { Component, OnInit } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { slideInAnimation } from "./shared/animations";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate) {}
  public static userInfo: UserInfo = {
    Avatar: "../../../assets/icons/icon-128x128 - Copy.png",
    CarsQty: 100,
    FullName: "اتوسرویس ماهان",
    Description: "خدمات روغن و لاستیک",
    ServiceQty: 1482,
    TodayServiceQty: 24
  };
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }
}

interface UserInfo {
  FullName: string;
  Description: string;
  Avatar: string;
  CarsQty: number;
  ServiceQty: number;
  TodayServiceQty: number;
}
