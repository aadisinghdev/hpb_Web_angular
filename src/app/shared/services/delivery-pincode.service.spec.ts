import { TestBed } from '@angular/core/testing';

import { DeliveryPincodeService } from './delivery-pincode.service';

describe('DeliveryPincodeService', () => {
  let service: DeliveryPincodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryPincodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
