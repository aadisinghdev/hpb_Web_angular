import { Component, OnInit } from '@angular/core';
import { PageLoaderService } from './page-loader.service';

@Component({
  selector: 'yaari-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent implements OnInit {

  constructor(public pageLoaderService: PageLoaderService) { }

  ngOnInit(): void {
  }

}
