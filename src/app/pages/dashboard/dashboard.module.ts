import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../../shared/shared.module";
import { NamemyTableComponent } from "./namemy-table/namemy-table.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  // { path: "home", component: NamemyTableComponent },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [HomeComponent, NamemyTableComponent]
})
export class DashboardModule {}
