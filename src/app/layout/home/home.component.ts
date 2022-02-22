import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from "jquery";
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  public isViewLoaded: boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }

  customOptions1: OwlOptions = {
    loop: true,
    autoplay: true,
    navText: ['', ''],
    margin: 30,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  }

  slidesStore = [
    {
      id: 1,
      src: '../../../assets/images/col_img_1.png',
      date: 'July 20, 21',
      comments: '0',
      alt: 'Image_1',
      user_name: 'Ram',
      title: 'Luxury Designer cloths for Kids',
    },
    {
      id: 2,
      src: '../../../assets/images/col_img_1.png',
      date: 'July 20, 21',
      comments: 0,
      alt: 'Image_2',
      user_name: 'Ram',
      title: 'Luxury Designer cloths for Kids',
    },
    {
      id: 3,
      src: '../../../assets/images/col_img_1.png',
      date: 'July 20, 21',
      comments: 0,
      alt: 'Image_3',
      user_name: 'Ram',
      title: 'Luxury Designer cloths for Kids',
    },
    {
      id: 4,
      src: '../../../assets/images/col_img_1.png',
      date: 'July 20, 21',
      comments: 0,
      alt: 'Image_4',
      user_name: 'Ram',
      title: 'Luxury Designer cloths for Kids',
    },
    {
      id: 5,
      src: '../../../assets/images/col_img_1.png',
      date: 'July 20, 21',
      comments: 0,
      alt: 'Image_5',
      user_name: 'Ram',
      title: 'Luxury Designer cloths for Kids',
    }
  ]

  activeSlides: SlidesOutputData;

  constructor(private router: Router) { }

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }

  ngOnInit(): void {
    // setTimeout(()=>{
    this.isViewLoaded = true;
    console.log('this.isViewLoaded: ', this.isViewLoaded);
    // },5000)
  }

  onChange(section,position,bannerName) {

    this.router.navigate([`app/products`], { queryParams: { section, position,bannerName} });

    



    // this.router.navigate([`app/products`], { queryParams: { 'sub_id': 2, item_name: "Kurta & Kurtis", category: "Indian & fusion wear" } });
  }
}
