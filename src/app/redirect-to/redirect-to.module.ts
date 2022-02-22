import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedirectToRoutingModule } from './redirect-to-routing.module';
import { RedirectToComponent } from './redirect-to.component';


@NgModule({
  declarations: [RedirectToComponent],
  imports: [
    CommonModule,
    RedirectToRoutingModule
  ]
})
export class RedirectToModule { }
