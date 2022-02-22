import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBySizeComponent } from './shop-by-size.component';

describe('ShopBySizeComponent', () => {
  let component: ShopBySizeComponent;
  let fixture: ComponentFixture<ShopBySizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopBySizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopBySizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
