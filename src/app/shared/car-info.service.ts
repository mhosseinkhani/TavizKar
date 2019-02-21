import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/index";

@Injectable()
export class CarInfoService {
  constructor(private http: HttpClient) {}

  getMakes(): Observable<any> {
    // return this.http.jsonp(environment.car_info_api_url + 'cmd=getMakes', 'callback');
    return this.http.get(environment.main_api_url + "/service/oils");
  }

  getModels(make: string): Observable<any> {
    return this.http.jsonp(
      environment.main_api_url + "cmd=getModels&make=" + make,
      "callback"
    );
  }

  getClients(page = 0): Observable<any> {
    return this.http.get(
      environment.main_api_url + "/Client" + "?page=" + page
    );
  }

  getAds(page = 0): Observable<any> {
    return this.http.get(environment.main_api_url + "/client/tabligh" + "?page=" + page);
  }
}
