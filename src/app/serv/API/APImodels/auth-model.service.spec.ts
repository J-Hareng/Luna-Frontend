import { TestBed } from '@angular/core/testing';

import { AuthModelService } from './auth-model.service';

describe('AuthModelService', () => {
  let service: AuthModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
