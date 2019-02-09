import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/index";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders().set(
      "Authorization",
      "bearer " + window.localStorage.getItem("token")
    );

    req = req.clone({
      headers: headers
    });
    return next.handle(req);
  }
}
