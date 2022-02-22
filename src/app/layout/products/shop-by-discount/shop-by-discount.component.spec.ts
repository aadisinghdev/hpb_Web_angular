import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopByDiscountComponent } from './shop-by-discount.component';

describe('ShopByDiscountComponent', () => {
  let component: ShopByDiscountComponent;
  let fixture: ComponentFixture<ShopByDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopByDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopByDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
