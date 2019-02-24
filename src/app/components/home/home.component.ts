import { Component, OnInit } from "@angular/core";
import { CarInfoService } from "../../shared/car-info.service";
import { AppComponent } from "../../app.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private servie: CarInfoService) {
    const user: any = JSON.parse(window.localStorage.getItem("userInfo"));
    this.userInfo = user;
  }
  public userInfo: any;
  public Adses: any = [];
  ngOnInit() {
    this.getAds();
  }

  getAds() {
    this.Adses = [];
    this.servie.getAds(0).subscribe(response => {
      response.forEach(
        (item): any => {
          this.Adses.push(item);
        }
      );
    });
  }
}
