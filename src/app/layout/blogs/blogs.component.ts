import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'yaari-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  public isBlogsRoute : boolean = false;
  constructor(private router : Router) { 
      if(this.router.url == '/app/blogs'){
            this.isBlogsRoute = true;
      }else if(this.router.url == '/' || this.router.url =='/app/home'){
            this.isBlogsRoute = false;
      }
  }

  ngOnInit(): void {
  }

}
