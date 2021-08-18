import { TestBed } from '@angular/core/testing';

import { SpinnerDataService } from './spinner-data.service';

describe('SpinnerDataService', () => {
  let service: SpinnerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
