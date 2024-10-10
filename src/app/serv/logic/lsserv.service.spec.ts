import { TestBed } from '@angular/core/testing';

import { LSServService } from './lsserv.service';

describe('LSServService', () => {
  let service: LSServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LSServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
