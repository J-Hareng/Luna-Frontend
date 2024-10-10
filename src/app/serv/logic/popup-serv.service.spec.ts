import { TestBed } from '@angular/core/testing';

import { PopupServService } from './popup-serv.service';

describe('PopupServService', () => {
  let service: PopupServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
