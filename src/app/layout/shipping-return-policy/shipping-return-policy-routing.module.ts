import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShippingReturnPolicyComponent } from './shipping-return-policy.component';

const routes: Routes = [{
      path : '',
      component : ShippingReturnPolicyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingReturnPolicyRoutingModule { }
