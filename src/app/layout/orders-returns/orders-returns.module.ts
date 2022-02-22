import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersReturnsRoutingModule } from './orders-returns-routing.module';
import { OrdersReturnsComponent } from './orders-returns.component';


@NgModule({
  declarations: [OrdersReturnsComponent],
  imports: [
    CommonModule,
    OrdersReturnsRoutingModule
  ]
})
export class OrdersReturnsModule { }
