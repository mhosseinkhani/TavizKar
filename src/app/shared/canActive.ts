import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.checkLogin()
      .then((res: any) => {
        if (res == false) {
          this.router.navigate(["/login"]);
          //  window.location.href = "/login";
        }
        return true;
      })
      .catch(error => {
        //  window.location.href = "/login";
        this.router.navigate(["/login"]);
        return false;
      });
  }

  checkLogin(): Promise<any> {
    return this.http
      .get(environment.main_api_url + "/Account/CheckLogin")
      .toPromise();
  }
}
