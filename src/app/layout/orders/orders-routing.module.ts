import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrdersComponent } from './orders.component';

const routes: Routes = [{
  path : '',
  component : OrdersComponent,
  children :[
    { path : 'checkout', component : CheckoutComponent , canActivate: [AuthGuard]},
    { path : 'place-order', component : CreateOrderComponent, canActivate: [AuthGuard]}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
