import { Component, OnInit } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { slideInAnimation } from "./shared/animations";
import { RouterOutlet } from "@angular/router";
import { UserService } from "./shared/User.Service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate, private userService: UserService) {
    this.getInfo();
  }
  public static userInfo = {
    Description: "",
    FullName: "",
    TodayServiceQty: 0,
    ClientQty: 1,
    ServiceQty: 4,
    Avatar: "../../../assets/icons/icon-128x128 - Copy.png"
  };
  private getInfo() {
    this.userService.getUserSummery().subscribe(res => {
      AppComponent.userInfo = res;
    });
  }

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

// interface UserInfo {
//   FullName: string;
//   Description: string;
//   Avatar: string;
//   CarsQty: number;
//   ServiceQty: number;
//   TodayServiceQty: number;
// }
