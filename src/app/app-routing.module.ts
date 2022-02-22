import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  { path : '', loadChildren : () => import('src/app/layout/home/home.module').then(m => m.HomeModule)},
  { path:'home', loadChildren: () => import('src/app/layout/home/home.module').then(m => m.HomeModule)},
  { path: 'app', loadChildren: () => import('../app/layout/layout.module').then(m => m.LayoutModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'redirectTo', loadChildren: () => import('./redirect-to/redirect-to.module').then(m => m.RedirectToModule) },
  { path: 'forget_password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  // { path : '', loadChildren : () => import('src/app/layout/cancel-order/cancel-order.module').then(m => m.CancelOrderModule)},
  {
    path: '**',
    redirectTo: "404",
    pathMatch: "full"
  },
  {
    path: '404',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
