import { TestBed } from '@angular/core/testing';

import { AccServiceService } from './acc-service.service';

describe('AccServiceService', () => {
  let service: AccServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
