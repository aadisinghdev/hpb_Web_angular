import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersReturnsComponent } from './orders-returns.component';

const routes: Routes = [{
      path : '',
      component : OrdersReturnsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersReturnsRoutingModule { }
