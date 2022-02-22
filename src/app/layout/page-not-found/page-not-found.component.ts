import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageLoaderService } from 'src/app/shared/page-loader/page-loader.service';

@Component({
  selector: 'yaari-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  timeLeft: number = 6;
  interval: any;
  constructor(
    private router: Router,private pageLoaderService:PageLoaderService
  ) { }

  ngOnInit(): void {

    this.pageLoaderService.startLoading();
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.pageLoaderService.stopLoading();
        this.timeLeft--;
      } else {
       
        this.router.navigateByUrl('/');
        window.open('/', '_self');
      }
    }, 1000);
  }

  onHomeClick() {
    this.router.navigateByUrl('/');
    window.open('/', '_self');
     
  }

}
