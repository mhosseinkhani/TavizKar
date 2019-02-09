import { environment } from "../../environments/environment";
import { Observable } from "rxjs/index";
import { Claim } from "./model/Claim";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CarServiceService {
  constructor(private http: HttpClient) {}

  getAll(page = 0): Observable<any> {
    return this.http.get(
      environment.main_api_url + "/Services" + "?page=" + page
    );
  }
}
