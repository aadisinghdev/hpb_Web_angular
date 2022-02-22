import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onActivate(e, scrollContainer) {
    document.body.scrollTop = 0;
    scrollContainer.scrollTop = 0;
    window.scrollTo(0, 0);
  }
}
