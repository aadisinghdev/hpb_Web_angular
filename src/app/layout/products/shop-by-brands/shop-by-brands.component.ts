import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductFilterService } from 'src/app/shared/services/product-filter.service';

@Component({
  selector: 'yaari-shop-by-brands',
  templateUrl: './shop-by-brands.component.html',
  styleUrls: ['./shop-by-brands.component.scss']
})
export class ShopByBrandsComponent implements OnInit {

  @Output() brandId=new EventEmitter()
 /**
 * Brand id will come inside this.
 */
  public shopByBrand: any;
  public brand=[]

  constructor(private productfilter:ProductFilterService) { }

  ngOnInit(): void {

    this.getProductBrands()
  }

  getProductBrands(){
    
    this.productfilter.getBrand().subscribe((response:[]) => {
      console.log(response)
      this.shopByBrand=response
    },error => {
      console.log(error);
    })
  }

  onBrand(id){
    console.log(id);
    if(this.brand.includes(id)){
      let index=this.brand.indexOf(id)
      this.brand.splice(index,1);
      console.log(this.brand)
      this.brandId.emit(this.brand)
    }
    else{
      this.brand.push(id);
      console.log(this.brand);
      this.brandId.emit(this.brand)
    }
  }



}
