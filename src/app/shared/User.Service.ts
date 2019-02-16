import { environment } from "../../environments/environment";
import { Observable } from "rxjs/index";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  getUserSummery(): Observable<any> {
    return this.http.get(environment.main_api_url + "/Account/UserSummery");
  }
}
