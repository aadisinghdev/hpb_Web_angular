import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductQuickViewComponent } from './product-quick-view/product-quick-view.component';
import { LoginWarningModalComponent } from './login-warning-modal/login-warning-modal.component';



@NgModule({
  declarations: [ProductQuickViewComponent, LoginWarningModalComponent],
  imports: [
    CommonModule
  ],
  exports : [LoginWarningModalComponent]
})
export class ModalsModule { }
