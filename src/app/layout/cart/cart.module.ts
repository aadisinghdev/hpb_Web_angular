import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ModalsModule } from '../modals/modals.module';

@NgModule({
  declarations: [CartComponent, AddToCartComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ModalsModule
  ]
})
export class CartModule { }
