import { UserService } from './../../shared/User.Service';
import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { CarInfoService } from "../../shared/car-info.service";
import { AppComponent } from "../../app.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private servie: CarInfoService, private userService: UserService) {

    const user: any = JSON.parse(window.localStorage.getItem("userInfo"));
    this.userInfo = user;
  }
  public userInfo: any;
  public Adses: any = [];
  ngOnInit() {
    //this.getAds();
    this.userService.getUserSummery().subscribe(res => {
      window.localStorage.setItem("userInfo", JSON.stringify(res.result));
      this.userInfo = res.result;
    });
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
