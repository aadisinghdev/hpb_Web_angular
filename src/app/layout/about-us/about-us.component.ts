import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onWomenClick() {
    console.log('item: ');
    this.router.navigate([`app/products`], { queryParams: { 'sub_id': 1, item_name: "Indian & fusion Wear", category: "Womens" } });
  }

  onMenClick() {
    console.log('item: ');
    this.router.navigate([`app/products`], { queryParams: { 'sub_id': 1, item_name: "Mens Ethnics Wear", category: "Mens" } });
  }

  onKidClick() {
    console.log('item: ');
    this.router.navigate([`app/products`], { queryParams: { 'sub_id': 1, item_name: "Kids Fashion Accessories", category: "Kids" } });
  }

  onHomeClick() {
    console.log('item: ');
    this.router.navigate([`app/products`], { queryParams: { 'sub_id': 1, item_name: "Home Décor", category: "Home Appliances" } });
  }

}
