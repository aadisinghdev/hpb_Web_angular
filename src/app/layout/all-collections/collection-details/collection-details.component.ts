import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from "@angular/router"
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'yaari-collection-details',
  templateUrl: './collection-details.component.html',
  styleUrls: ['./collection-details.component.scss']
})
export class CollectionDetailsComponent implements OnInit {

  public categoryName:String
  public collectionId : any = 0;
  public collectionCategories : any = [];
  constructor(private router : Router, private route : ActivatedRoute,private categoryService : CategoryService) { 
      if(this.route.snapshot.queryParams.id){
          this.collectionId = this.route.snapshot.queryParams.id;
      }
  }

  ngOnInit(): void {
    this.getCategoryById();
  }

  get catName(){
    return this.categoryName
  }

  getCategoryById(){
    this.categoryService.getCategoryByCollectionId(this.collectionId).subscribe(res =>{
          try {
              this.collectionCategories = res;
              this.categoryName=this.collectionCategories[0].collection.name;
              
          } catch (error) {
              console.log("--error----",error);
          }
    })
  }
}
