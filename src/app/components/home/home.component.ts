import { UserService } from './../../shared/User.Service';
import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { CarInfoService } from "../../shared/car-info.service";
import { AppComponent } from "../../app.component";
import { UserService } from "src/app/shared/User.Service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
<<<<<<< HEAD
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
=======
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
>>>>>>> 6d9706c64ed7d741440b88228d0000579d3cd247
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
