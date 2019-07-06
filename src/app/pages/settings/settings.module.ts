import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ProfileComponent } from "./profile/profile.component";
const routes: Routes = [
  { path: "profile", component: ProfileComponent },
  { path: "", redirectTo: "profile", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [ProfileComponent]
})
export class SettingsModule {}
