import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { ServiceCreateComponent } from "./components/service-create/service-create.component";
import { ServiceListComponent } from "./components/service-list/service-list.component";
import { HomeComponent } from "./components/home/home.component";
import { CarListComponent } from "./components/car-list/car-list.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./shared/canActive";
import { ChangeInfoComponent } from "./components/changeInfo/changeInfo.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "create", component: ServiceCreateComponent },
  { path: "services", component: ServiceListComponent },
  { path: "clients", component: CarListComponent },
  { path: "login", component: LoginComponent },
  { path: "updateInfo", component: ChangeInfoComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
