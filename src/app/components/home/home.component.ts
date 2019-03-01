import { UserService } from './../../shared/User.Service';
import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { CarInfoService } from "../../shared/car-info.service";
import { AppComponent } from "../../app.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnChanges {
  public userInfo: any;
  public Adses: any = [];

  ngOnChanges(changes: SimpleChanges) {
    const user: any = JSON.parse(window.localStorage.getItem("userInfo"));
    this.userInfo = user;
  }
  constructor(private servie: CarInfoService, private userService: UserService) {
    const user: any = JSON.parse(window.localStorage.getItem("userInfo"));
    this.userInfo = user;
    this.userService.getUserSummery().subscribe(res => {
      window.localStorage.setItem("userInfo", JSON.stringify(res.result));
      this.userInfo =res.result;
   });
  }

  ngOnInit() {}


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
