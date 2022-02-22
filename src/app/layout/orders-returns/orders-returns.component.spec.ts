import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersReturnsComponent } from './orders-returns.component';

describe('OrdersReturnsComponent', () => {
  let component: OrdersReturnsComponent;
  let fixture: ComponentFixture<OrdersReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersReturnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
