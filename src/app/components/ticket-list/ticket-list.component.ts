import { ToastrManager } from "ng6-toastr-notifications";
import { UserService } from "src/app/shared/User.Service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-ticket-list",
  templateUrl: "./ticket-list.component.html",
  styleUrls: ["./ticket-list.component.css"]
})
export class TicketListComponent implements OnInit {
  constructor(
    private router: Router,
    private service: UserService,
    public toastr: ToastrManager
  ) {}
  public isLoading = false;
  tick: any = {};
  ngOnInit() {}
  submit() {
    this.isLoading = true;
    this.service.addTicket(this.tick).subscribe(
      res => {
        this.isLoading = false;
        this.toastr.infoToastr(
          "همکاران ما در سریع ترین زمان ممکن ا شما تماس خواهند گرفت",
          "ارسال",
          {
            toastTimeout: 1500
          }
        );
        this.tick = {};
      },
      error => {
        this.isLoading = false;
      }
    );
  }
}
