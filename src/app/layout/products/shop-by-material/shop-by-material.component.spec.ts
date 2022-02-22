import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopByMaterialComponent } from './shop-by-material.component';

describe('ShopByMaterialComponent', () => {
  let component: ShopByMaterialComponent;
  let fixture: ComponentFixture<ShopByMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopByMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopByMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
