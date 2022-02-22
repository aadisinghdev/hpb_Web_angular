import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [{
    path : '',
    component : UserProfileComponent,
    canActivate : [AuthGuard]
    },
    { path : 'password' , component : ChangePasswordComponent , canActivate : [AuthGuard]},
    { path : 'my-orders' , component : MyOrdersComponent , canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
