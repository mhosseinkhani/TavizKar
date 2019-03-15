import { Component, OnInit, AfterViewInit } from "@angular/core";
import { CarInfoService } from "../../shared/car-info.service";
import { DictionaryItem } from "../../shared/model/DictionaryItem";
import { CarServiceService } from "src/app/shared/CarService.Service";
import { ToastrManager } from "ng6-toastr-notifications";
import { Router } from "@angular/router";

@Component({
  selector: "app-service-create",
  templateUrl: "./service-create.component.html",
  styleUrls: ["./service-create.component.css"]
})
export class ServiceCreateComponent implements OnInit {
  carMakes: DictionaryItem[];
  isLoading = true;
  public oilMark: any;
  public formService: any = {
    Car: {}
  };
  isSendedNumber = false;
  public selectedFilter = {
    OilFilter: false,
    AirFilter: false,
    GearboxOil: false,
    BreakOil: false,
    SteeringOil: false,
    BattryWater: false,
    Grease: false,
    WindSet: false,
    CabinFilter: false,
    TimingBelt:false
  };
  constructor(
    private carInfoService: CarInfoService,
    private servie: CarServiceService,
    public toastr: ToastrManager,
    private router: Router
  ) {}

  ngOnInit() {
    if (window.localStorage.getItem("oils")) {
      this.carMakes = JSON.parse(window.localStorage.getItem("oils"));
      this.isLoading = false;
    } else {
      this.carInfoService.getMakes().subscribe(
        res => {
          this.isLoading = false;
          this.toastr.infoToastr("آماده سازی انجام شد", "آماده", {
            toastTimeout: 999
          });
          this.carMakes = res.map(
            m =>
              <DictionaryItem>{
                code: m.make_id,
                name: m.make_display
              }
          );
          // add here default value for oil
          // add to localstorage
          window.localStorage.setItem("oils", JSON.stringify(this.carMakes));
        },
        error => {
          this.isLoading = false;
          if (error.status === 401) {
            this.router.navigate(["/login"]);
          }
        }
      );
    }
    this.formService.NextKm = 5;
  }

  submit() {
    if (!this.formService.Km) {
      this.toastr.warningToastr("کارکرد فعلی را وارد نمایید", "هشدار", {
        toastTimeout: 2000
      });
      return;
    }
    if (!this.formService.Car.UserFullName) {
      this.toastr.warningToastr("نام مشتری را وارد نمایید", "هشدار", {
        toastTimeout: 2000
      });
      return;
    }
    if (!this.formService.Car.UserMobile) {
      this.toastr.warningToastr("شماره مشتری را وارد نمایید", "هشدار", {
        toastTimeout: 2000
      });
      return;
    }
    if (this.formService.Car.UserMobile.length != 11) {
      this.toastr.warningToastr("شماره مشتری صحیح نمی باشد.", "هشدار", {
        toastTimeout: 2000
      });
      return;
    }
    if (!this.formService.OilName) {
      // this.toastr.warningToastr("روغن را انتخاب نمایید", "هشدار", {
      //   toastTimeout: 999
      // });
      // return;
      this.formService.OilName = this.carMakes[0];
    }
    const item: any = this.selectedFilter;
    item.Car = {
      UserMobile: this.formService.Car.UserMobile,
      UserFullName: this.formService.Car.UserFullName
    };
    item.Km = this.formService.Km;
    item.NextKm = Number.parseInt(this.formService.NextKm, 10);
    // if (item.NextKm < 100) {
    //   item.NextKm = item.NextKm * 1000;
    // }
    // item.NextKm =
    //   Number.parseInt(this.formService.Km, 10) +
    //   item.NextKm;
    item.OilName = this.formService.OilName.name;
    item.OilType = this.formService.OilName.code;
    this.isLoading = true;
    this.servie.addService(item).subscribe(
      res => {
        this.isSendedNumber = false;
        this.toastr.successToastr("سرویس مشتری ثبت گردید", "ثبت");
        this.isLoading = false;
        this.formService = {
          Car: {}
        };
        this.selectedFilter = {
          OilFilter: false,
          AirFilter: false,
          GearboxOil: false,
          BreakOil: false,
          SteeringOil: false,
          BattryWater: false,
          Grease: false,
          WindSet: false,
          CabinFilter: false,
          TimingBelt: false
        };
        this.formService.NextKm = 5;
      },
      error => {
        this.toastr.errorToastr("متاسفانه خطایی رخ داده است", "خطا");
        this.isLoading = false;

        if (error.status === 401) {
          this.router.navigate(["/login"]);
        }
      }
    );
  }

  onLeaveMobile() {
    const mobile = this.formService.Car.UserMobile;
    if (mobile.length != 11) {
      this.toastr.warningToastr("شماره مشتری صحیح نمی باشد.", "هشدار", {
        toastTimeout: 2000
      });
      return;
    }
    this.isSendedNumber = true;
    this.servie.getClientInfo(this.formService.Car.UserMobile).subscribe(
      res => {
        if (!this.formService.Car.UserFullName) {
          this.formService.Car.UserFullName = res.FullName;
        }
        if (!this.formService.Km) {
          this.formService.Km = res.Km;
        }
        if (this.formService.NextKm === 5) {
          this.formService.NextKm =
            res.NextKm > 1000 ? res.NextKm / 1000 : res.NextKm;
        }
        if (!this.formService.Car.OilName) {
          const oil = this.carMakes.find(a => a.name === res.OilName);
          this.formService.Car.OilName = oil;
        }
        this.isSendedNumber = false;
      },
      error => {
        this.isSendedNumber = false;

        if (error.status === 401) {
          this.router.navigate(["/login"]);
        }
      }
    );
  }
}
