import {NgModule} from "@angular/core";

import {RouterModule, Routes} from "@angular/router";
import { ServiceCreateComponent } from "./components/service-create/service-create.component";
import { ServiceListComponent } from "./components/service-list/service-list.component";
import { HomeComponent } from "./components/home/home.component";
import { CarListComponent } from "./components/car-list/car-list.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create', component: ServiceCreateComponent},
  {path: 'services', component: ServiceListComponent},
  {path: 'clients', component: CarListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
