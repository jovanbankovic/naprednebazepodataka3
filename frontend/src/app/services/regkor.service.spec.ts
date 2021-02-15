import { TestBed } from '@angular/core/testing';

import { RegkorService } from './regkor.service';

describe('RegkorService', () => {
  let service: RegkorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegkorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
