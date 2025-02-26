import { TestBed } from '@angular/core/testing';

import { SuccessHandlingService } from './success-handling.service';

describe('SuccessHandlingService', () => {
  let service: SuccessHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
