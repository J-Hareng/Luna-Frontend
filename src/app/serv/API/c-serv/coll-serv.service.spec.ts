import { TestBed } from '@angular/core/testing';

import { CollServService } from './coll-serv.service';

describe('CollServService', () => {
  let service: CollServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
