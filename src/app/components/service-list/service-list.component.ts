import { CarServiceService } from "./../../shared/CarService.Service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-claim-list",
  templateUrl: "./service-list.component.html",
  styleUrls: ["./service-list.component.css"]
})
export class ServiceListComponent implements OnInit {
  constructor(private service: CarServiceService) {}
  private page = 0;
  public data: any[] = [];
  public isLoading = true;
  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.service.getAll(this.page).subscribe(response => {
      response.forEach(
        (item): any => {
          this.isLoading = false;
          const serviced = [];
          Object.keys(item).forEach(a => {
            if (
              [
                "AirFilter",
                "BattryWater",
                "BreakOil",
                "CabinFilter",
                "EngineOil",
                "GearboxOil",
                "Grease",
                "OilFilter",
                "SteeringOil",
                "WindSet"
              ].some(x => x === a)
            ) {
              if (item[a] === 1) {
                serviced.push(this.getName(a));
              }
            }
          });
          if (serviced.length === 10) {
            item.serviced = ["سروس کامل"];
          } else {
            item.serviced = serviced;
          }
          this.data.push(item);
        }
      );
    });
  }

  loadMore() {
    this.page += 1;
    this.isLoading = true;
    this.getData();
  }

  getName(item) {
    switch (item) {
      case "AirFilter":
        return "فیلتر هوا";
      case "BattryWater":
        return "آب باطری";
      case "BreakOil":
        return "روغن ترمز";
      case "CabinFilter":
        return "فیلتر هوا";
      case "EngineOil":
        return "روغن موتور";
      case "GearboxOil":
        return "روغن گیربکس";
      case "Grease":
        return "گریس";
      case "OilFilter":
        return "فیلتر روغن";
      case "SteeringOil":
        return "روغن هیدرولیک";
      case "WindSet":
        return "تنظیم باد";
    }
  }
}
