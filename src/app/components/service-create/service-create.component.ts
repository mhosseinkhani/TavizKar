import { Component, OnInit } from "@angular/core";
import { CarInfoService } from "../../shared/car-info.service";
import { DictionaryItem } from "../../shared/model/DictionaryItem";
import { CarServiceService } from "src/app/shared/CarService.Service";
import { ToastrManager } from "ng6-toastr-notifications";

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
  public selectedFilter = {
    OilFilter: false,
    AirFilter: false,
    GearboxOil: false,
    BreakOil: false,
    SteeringOil: false,
    BattryWater: false,
    Grease: false,
    WindSet: false,
    CabinFilter: false
  };
  constructor(
    private carInfoService: CarInfoService,
    private servie: CarServiceService,
    public toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.carInfoService.getMakes().subscribe(res => {
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
    });
    this.formService.NextKm = 5000;
  }

  submit() {
    if (!this.formService.Km) {
      this.toastr.warningToastr("کارکرد فعلی را وارد نمایید", "هشدار", {
        toastTimeout: 999
      });
      return;
    }
    if (!this.formService.Car.UserFullName) {
      this.toastr.warningToastr("نام مشتری را وارد نمایید", "هشدار", {
        toastTimeout: 999
      });
      return;
    }
    if (!this.formService.Car.UserMobile) {
      this.toastr.warningToastr("شماره مشتری را وارد نمایید", "هشدار", {
        toastTimeout: 999
      });
      return;
    }
    if (!this.formService.OilName) {
      this.toastr.warningToastr("روغن را انتخاب نمایید", "هشدار", {
        toastTimeout: 999
      });
      return;
    }
    const item: any = this.selectedFilter;
    item.Car = {
      UserMobile: this.formService.Car.UserMobile,
      UserFullName: this.formService.Car.UserFullName
    };
    item.Km = this.formService.Km;
    item.NextKm =
      Number.parseInt(this.formService.Km, 10) +
      Number.parseInt(this.formService.NextKm, 10);
    item.OilName = this.formService.OilName.name;
    item.OilType = this.formService.OilName.code;
    this.isLoading = true;
    this.servie.addService(item).subscribe(
      res => {
        this.toastr.successToastr("سرویس مشتری ثبت گردید", "ثبت");
        this.isLoading = false;
        this.formService = {
          Car: {}
        };
        this.selectedFilter={
          OilFilter: false,
          AirFilter: false,
          GearboxOil: false,
          BreakOil: false,
          SteeringOil: false,
          BattryWater: false,
          Grease: false,
          WindSet: false,
          CabinFilter: false
        };
      },
      error => {
        this.toastr.errorToastr("متاسفانه خطایی رخ داده است", "خطا");
        this.isLoading = false;
      }
    );
  }
}
