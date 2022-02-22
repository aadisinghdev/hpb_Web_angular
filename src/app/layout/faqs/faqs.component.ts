import { Component, OnInit } from '@angular/core';
import {FaqService} from '../../shared/services/faq.service';


@Component({
  selector: 'yaari-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  public faqs: object = [{}];

    // public faqs = [];
  public errorMsg;
  
  constructor(private faq:FaqService) { }

  ngOnInit() {
    this.faq.getFaq()
      .subscribe(data => this.faqs = data,
                 error => this.errorMsg = error);
        
                //  console.log(this.faqs.values);
  }
  
  
  }


