import { CarServiceService } from "./shared/CarService.Service";
import { environment } from "../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import {
  HTTP_INTERCEPTORS,
  HttpClientJsonpModule,
  HttpClientModule
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { FormsModule } from "@angular/forms";

import { SuiModule } from "ng2-semantic-ui";

import { AppRoutingModule } from "./routing.module";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CarInfoService } from "./shared/car-info.service";
import { PushNotificationService } from "./shared/push-notification.service";
import { CarPredicatorService } from "./shared/car-predicator.service";
import { HttpInterceptorService } from "./shared/http-interceptor.service";
import { NgHttpLoaderModule } from "ng-http-loader";
import { ServiceCreateComponent } from "./components/service-create/service-create.component";
import { ServiceListComponent } from "./components/service-list/service-list.component";
import { HomeComponent } from "./components/home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ng6-toastr-notifications";
import { CarListComponent } from "./components/car-list/car-list.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./shared/canActive";
import { UserService } from "./shared/User.Service";
import { ChangeInfoComponent } from "./components/changeInfo/changeInfo.component";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ServiceCreateComponent,
    MenuComponent,
    ServiceListComponent,
    FooterComponent,
    HomeComponent,
    CarListComponent,
    LoginComponent,
    ChangeInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SuiModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),
    NgHttpLoaderModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CarInfoService,
    PushNotificationService,
    CarPredicatorService,
    CarServiceService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
