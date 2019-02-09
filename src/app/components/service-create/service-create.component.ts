import { Component, OnInit } from "@angular/core";
import { Claim } from "../../shared/model/Claim";
import { ClaimCacheService } from "../../shared/claim-cache.service";
import { CarInfoService } from "../../shared/car-info.service";
import { DictionaryItem } from "../../shared/model/DictionaryItem";
import { SwPush } from "@angular/service-worker";
import { PushNotificationService } from "../../shared/push-notification.service";
import { CarPredicatorService } from "../../shared/car-predicator.service";

@Component({
  selector: "app-service-create",
  templateUrl: "./service-create.component.html",
  styleUrls: ["./service-create.component.css"]
})
export class ServiceCreateComponent implements OnInit {
  carMakes: DictionaryItem[];
  isLoading = true;
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
  constructor(private carInfoService: CarInfoService) {}

  ngOnInit() {
    this.carInfoService.getMakes().subscribe(res => {
      console.log(res);
      this.carMakes = res.map(
        m =>
          <DictionaryItem>{
            code: m.make_id,
            name: m.make_display
          }
      );
    });
  }
}
