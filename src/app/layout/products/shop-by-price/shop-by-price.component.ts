import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'yaari-shop-by-price',
  templateUrl: './shop-by-price.component.html',
  styleUrls: ['./shop-by-price.component.scss']
})
export class ShopByPriceComponent implements OnInit {

  constructor() { }

  @Output() priceId=new EventEmitter()
  public shopByPrice: any;
  public price=[]

  ngOnInit(): void {

    // this.getProductPrice()
  }

  getProductPrice(){

    this.shopByPrice=[
      {

      }
    ]

  }

  onPrice(id){
    console.log(id);
    this.price=id;
    this.priceId.emit(this.price)
    // if(this.price.includes(id)){
    //   let index=this.price.indexOf(id)
    //   this.price.splice(index,1);
    //   console.log(this.price)
    //   this.priceId.emit(this.price)
    // }
    // else{
    //   this.price.push(id);
    //   console.log(this.price);
    //   this.priceId.emit(this.price)
    // }

  }

}
