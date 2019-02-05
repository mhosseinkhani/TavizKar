import {NgModule} from "@angular/core";

import {RouterModule, Routes} from "@angular/router";
import {ClaimListComponent} from "./components/claim-list/claim-list.component";
import { ServiceCreateComponent } from "./components/service-create/service-create.component";

const appRoutes: Routes = [
  {path: '', component: ServiceCreateComponent},
  {path: 'claims', component: ClaimListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
