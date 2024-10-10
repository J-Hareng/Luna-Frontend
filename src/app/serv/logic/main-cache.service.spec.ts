import { TestBed } from '@angular/core/testing';

import { MainCacheService } from './main-cache.service';

describe('MainCacheService', () => {
  let service: MainCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
