import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopByColorComponent } from './shop-by-color.component';

describe('ShopByColorComponent', () => {
  let component: ShopByColorComponent;
  let fixture: ComponentFixture<ShopByColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopByColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopByColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
