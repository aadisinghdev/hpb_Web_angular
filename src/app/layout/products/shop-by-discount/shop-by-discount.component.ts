import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'yaari-shop-by-discount',
  templateUrl: './shop-by-discount.component.html',
  styleUrls: ['./shop-by-discount.component.scss']
})
export class ShopByDiscountComponent implements OnInit {

  @Output() discountId=new EventEmitter()
  
  constructor() { }

  public shopByDiscount: any;
  public discount=[]

  ngOnInit(): void {
    this.getProductDiscount();
  }

  getProductDiscount(){
    this.shopByDiscount=[
      {
        id:10,
        name:"10% Off or more"
      },
      {
        id:20,
        name:"20% Off or more"
      },
      {
        id:30,
        name:"30% Off or more"
      },{
        id:40,
        name:"40% Off or more"
      },{
        id:50,
        name:"50% Off or more"
      },{
        id:60,
        name:"60% Off or more"
      },{
        id:70,
        name:"70% Off or more"
      },
      {
        id:80,
        name:"80% Off or more"
      }
    ]
  }

  onDiscount(id){
    console.log(id);
    // if(this.discount.includes(id)){
    //   let index=this.discount.indexOf(id)
    //   this.discount.splice(index,1);
    //   console.log(this.discount)
    //   // this.discountId.emit(this.discount)
    // }
    // else{
    //   this.discount.push(id);
    //   console.log(this.discount);
    //   // this.discountId.emit(this.discount)
    // }
    this.discount=[id];
    console.log(this.discount);
    this.discountId.emit(this.discount);

  }

}
