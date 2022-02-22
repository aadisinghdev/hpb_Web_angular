import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';
import { CategoryMenuBarComponent } from './category-menu-bar/category-menu-bar.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [HeaderComponent, CategoryMenuBarComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    HeaderRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }
