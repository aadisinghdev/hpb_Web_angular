import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyWishlistComponent } from './my-wishlist/my-wishlist.component';
import { WishlistModule } from '../wishlist/wishlist.module';
import { LayoutRoutingModule } from '../layout-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [UserProfileComponent, ChangePasswordComponent, MyOrdersComponent, MyWishlistComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WishlistModule,
    LayoutRoutingModule,
    NgbModule,
    NgxPaginationModule
    
  ]
})
export class UserProfileModule { }
