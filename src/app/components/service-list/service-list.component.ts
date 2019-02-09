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
  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.service
      .getAll(this.page)
      .subscribe(response => {
        response.forEach(
          (item): any => {
            this.data.push(item);
          }
        );
      });
  }

  loadMore() {
    this.page += 1;
    this.getData();
  }
}
