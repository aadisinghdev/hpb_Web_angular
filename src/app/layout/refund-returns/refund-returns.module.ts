import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundReturnsRoutingModule } from './refund-returns-routing.module';
import { RefundReturnsComponent } from './refund-returns.component';


@NgModule({
  declarations: [RefundReturnsComponent],
  imports: [
    CommonModule,
    RefundReturnsRoutingModule
  ]
})
export class RefundReturnsModule { }
