import { TestBed } from '@angular/core/testing';

import { WinServService } from './win-serv.service';

describe('WinServService', () => {
  let service: WinServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
