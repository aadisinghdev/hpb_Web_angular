import { Component, OnInit, Output } from '@angular/core';
import { ProductFilterService } from 'src/app/shared/services/product-filter.service';

import { EventEmitter } from '@angular/core';

@Component({
  selector: 'yaari-shop-by-color',
  templateUrl: './shop-by-color.component.html',
  styleUrls: ['./shop-by-color.component.scss']
})
export class ShopByColorComponent implements OnInit {

  @Output() colorIds=new EventEmitter();

  constructor( private productfilter:ProductFilterService) { }

  public colors:any=[];
  public color:any=[];

  ngOnInit(): void {
    this.displayColorNames();
  }

  displayColorNames(){
    this.productfilter.getColors().subscribe(response => {
     this.colors=response;
     console.log(this.colors);
    });
  }

  onColorAdd(id){
    if(this.color.includes(id)){
      let idIndex=this.color.indexOf(id);
      this.color.splice(idIndex,1);
      this.colorIds.emit(this.color);
    }
    else{
      this.color.push(id);
      this.colorIds.emit(this.color);
    }

    console.log(this.color);
  }
}
