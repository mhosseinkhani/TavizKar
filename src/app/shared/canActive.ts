import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  RouterOutlet,
  Router
} from "@angular/router";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.checkLogin()
      .then(res => {
        if (res == true) return true;
        else this.router.navigate(["/login"]);      })
      .catch(error => {
        //
        this.router.navigate(["/login"]);
        return false;
      });
  }

  checkLogin(): Promise<boolean> {
    return this.http
      .get(environment.main_api_url + "/Account/CheckLogin")
      .toPromise()
      .then(res => {
        if (res == true) return true;
        else this.router.navigate(["/login"]);
      })
      .catch(error => {
        this.router.navigate(["/login"]);
        return false;
      });
  }
}
