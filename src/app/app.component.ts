import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageLoaderService } from './shared/page-loader/page-loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Yaari-Frontend';
  constructor(
    private router : Router , 
    private route : ActivatedRoute,
    public pageLoaderService: PageLoaderService
    ){}

  get isNotCheckoutRoute(){
    if(this.route.snapshot.queryParams.txnToken){
        return true;
    }else {
       return false;
    }
  }

  onActivate(e, scrollContainer) {
    document.body.scrollTop = 0;
    scrollContainer.scrollTop = 0;
    window.scrollTo(0, 0);
  }

}
