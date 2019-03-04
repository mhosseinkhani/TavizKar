import { Component, OnInit } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { slideInAnimation } from "./shared/animations";
import { RouterOutlet, Router } from "@angular/router";
import { UserService } from "./shared/User.Service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  constructor(
    private swUpdate: SwUpdate,
    private userService: UserService,
    private router: Router
  ) {
    window.localStorage.setItem(
      "userInfo",
      JSON.stringify({
        Description: "",
        FullName: "",
        TodayServiceQty: 0,
        ClientQty: 0,
        ServiceQty: 0,
        Avatar: "../../../assets/icons/icon-128x128 - Copy.png"
      })
    );
    this.getInfo();
  }
  // public static userInfo = {
  //   Description: "",
  //   FullName: "",
  //   TodayServiceQty: 0,
  //   ClientQty: 1,
  //   ServiceQty: 4,
  //   Avatar: "../../../assets/icons/icon-128x128 - Copy.png"
  // };
  private getInfo() {
    this.userService.getUserSummery().subscribe(
      res => {
        window.localStorage.setItem("userInfo", JSON.stringify(res.result));
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(["/login"]);
        }
      }
    );
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
