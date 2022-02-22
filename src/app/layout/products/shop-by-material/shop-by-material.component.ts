import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yaari-shop-by-material',
  templateUrl: './shop-by-material.component.html',
  styleUrls: ['./shop-by-material.component.scss']
})
export class ShopByMaterialComponent implements OnInit {

  /**
 * Material id will come inside this.
 */
  public shopByMaterial: any;
  constructor() { }

  ngOnInit(): void {
  }

}
