import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { UserListComponent } from "./user-list/user-list.component";
import { UserService } from "./user.service";

const routes: Routes = [
  { path: "list", component: UserListComponent },
  { path: "", redirectTo: "list", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [UserListComponent],
  providers: [UserService]
})
export class UserModule {}
