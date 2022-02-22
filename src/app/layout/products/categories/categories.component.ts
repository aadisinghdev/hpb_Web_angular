import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import * as _ from "lodash";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  /** 
   * 
  */
  public productCategories

  /**
   * 
  */
  public Object = Object;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * 
  */
  getCategories() {
    this.categoryService.getAllSubCategories().subscribe(response => {
      this.productCategories = _.groupBy(response, (item) => {
        if(item.category)
        return item.category.name;
      });
    })
  }
}
