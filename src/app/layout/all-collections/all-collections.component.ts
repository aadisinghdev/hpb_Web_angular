import { Component, OnInit } from '@angular/core';
import { CollectionsService } from 'src/app/shared/services/collections.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import * as _ from "lodash";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'yaari-all-collections',
  templateUrl: './all-collections.component.html',
  styleUrls: ['./all-collections.component.scss']
})
export class AllCollectionsComponent implements OnInit {

  /**
   * 
   */
  public allCollections: any = [];
  public Object = Object;
  isCollectionLoaded : boolean = false;
  constructor(private collectionService: CollectionsService, private categoryService: CategoryService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCollection();
    // setTimeout(()=>{
      this.isCollectionLoaded = true;
      console.log('this.isCollectionLoaded: ', this.isCollectionLoaded);
    // },5000)
  }
  /**
   * 
   */
  getAllCollection() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.allCollections = _.groupBy(res, (response) => {
        return response.collection.name;
      });
      for (let key in this.allCollections) {
        for (let item of this.allCollections[key]) {
          this.allCollections[key]['banner_img'] = item.collection.banners;
          this.allCollections[key]['collectionId'] = item.collection.id;
        }
      }
    })
  }

  collectionItemList(id) {
    this.router.navigate(['/app/all-collections/', 'details'], { queryParams: { 'id': id }, queryParamsHandling: 'merge' });
  }
}
