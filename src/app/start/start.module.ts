import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../services/auth.guard";

import { StartComponent } from "./start.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

const routes: Routes = [
  {
    path: "",
    component: StartComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("../pages/dashboard/dashboard.module").then(
            m => m.DashboardModule
          )
      },
      {
        path: "user",
        loadChildren: () =>
          import("../pages/user/user.module").then(m => m.UserModule)
      },
      {
        path: "settings",
        loadChildren: () =>
          import("../pages/settings/settings.module").then(
            m => m.SettingsModule
          )
      },
      {
        path: "order",
        loadChildren: () =>
          import("../pages/order/order.module").then(m => m.OrderModule)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [
    StartComponent,
    SideNavComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class StartModule {}
