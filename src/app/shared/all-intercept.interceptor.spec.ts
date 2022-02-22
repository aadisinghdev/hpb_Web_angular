import { TestBed } from '@angular/core/testing';

import { AllInterceptInterceptor } from './all-intercept.interceptor';

describe('AllInterceptInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AllInterceptInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AllInterceptInterceptor = TestBed.inject(AllInterceptInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
