import { TestBed, inject } from '@angular/core/testing';

import { LandermapService } from './landermap.service';

describe('LandermapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandermapService]
    });
  });

  it('should be created', inject([LandermapService], (service: LandermapService) => {
    expect(service).toBeTruthy();
  }));
});
