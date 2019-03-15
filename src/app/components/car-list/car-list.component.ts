import { Component, OnInit } from "@angular/core";
import { CarInfoService } from "src/app/shared/car-info.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-car-list",
  templateUrl: "./car-list.component.html",
  styleUrls: ["./car-list.component.css"]
})
export class CarListComponent implements OnInit {
  constructor(private service: CarInfoService, private router: Router) {}
  private page = 0;
  public data: any[] = [];
  public isLoading = true;
  public showLoadMore = true;
  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.service.getClients(this.page).subscribe(
      response => {
        this.isLoading = false;
        if (response.length == 0) { this.showLoadMore = false; }
        response.forEach(
          (item): any => {
            this.data.push(item);
          }
        );
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(["/login"]);
        }
      }
    );
  }

  loadMore() {
    this.page += 1;
    this.isLoading = true;
    this.getData();
  }
}
