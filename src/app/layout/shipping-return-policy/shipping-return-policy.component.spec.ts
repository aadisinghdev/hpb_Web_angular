import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingReturnPolicyComponent } from './shipping-return-policy.component';

describe('ShippingReturnPolicyComponent', () => {
  let component: ShippingReturnPolicyComponent;
  let fixture: ComponentFixture<ShippingReturnPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingReturnPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingReturnPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
