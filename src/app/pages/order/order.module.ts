import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { PlaceOrderComponent } from "./place-order/place-order.component";
import { OrderService } from "./order.service";

const routes: Routes = [
  { path: "create", component: PlaceOrderComponent },
  { path: "", redirectTo: "create", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [PlaceOrderComponent],
  providers: [OrderService]
})
export class OrderModule {}
