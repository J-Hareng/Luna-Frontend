import { TestBed } from '@angular/core/testing';

import { NotifierStreamService } from './notifier-stream.service';

describe('NotifierStreamService', () => {
  let service: NotifierStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifierStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
