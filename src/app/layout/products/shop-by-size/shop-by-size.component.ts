import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductFilterService } from 'src/app/shared/services/product-filter.service';

@Component({
  selector: 'yaari-shop-by-size',
  templateUrl: './shop-by-size.component.html',
  styleUrls: ['./shop-by-size.component.scss']
})
export class ShopBySizeComponent implements OnInit {

  @Output() size=new EventEmitter()

  public shopBySize: any;
  public sizes=[]


  constructor(private productfilter:ProductFilterService) { }

  ngOnInit(): void {
    // this.getProductSize()
  }

  
  // getProductSize(){
    
  //   this.productfilter.getSize().subscribe((response:[]) => {
  //     console.log(response)
  //     this.shopBySize=response
  //   },error => {
  //     console.log(error);
  //   })
  // }

  

  onSize(id){
    console.log(id);
    if(this.sizes.includes(id)){
      let index=this.sizes.indexOf(id)
      this.sizes.splice(index,1);
      console.log(this.sizes)
      this.size.emit(this.sizes)
    }
    else{
      this.sizes.push(id);
      console.log(this.sizes);
      this.size.emit(this.sizes)
    }
  }


}
