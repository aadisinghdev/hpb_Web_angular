import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { BrandsComponent } from './brands/brands.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-condition/terms-and-condition.component';
import { ShippingReturnPolicyComponent } from './shipping-return-policy/shipping-return-policy.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ContactUsModule } from './contact-us/contact-us.module';
import { CancelOrderModule } from './cancel-order/cancel-order.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [LayoutComponent, BrandsComponent, FrequentlyAskedQuestionsComponent, PrivacyPolicyComponent, TermsAndConditionsComponent, ShippingReturnPolicyComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ContactUsModule,
    CancelOrderModule,
    NgbModule,
    NgxPaginationModule,
    ProductsModule
  ]
})
export class LayoutModule { }
