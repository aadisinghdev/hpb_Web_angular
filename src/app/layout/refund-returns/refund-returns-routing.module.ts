import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefundReturnsComponent } from './refund-returns.component';

const routes: Routes = [{
    path : '',
    component : RefundReturnsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefundReturnsRoutingModule { }
