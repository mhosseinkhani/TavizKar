import { Component, OnInit } from "@angular/core";
import { CarInfoService } from "../../shared/car-info.service";
import { AppComponent } from "../../app.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private servie: CarInfoService) {}
  public userInfo = AppComponent.userInfo;
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
