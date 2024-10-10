import { TestBed } from '@angular/core/testing';

import { TeamServService } from './team-serv.service';

describe('TeamServService', () => {
  let service: TeamServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
