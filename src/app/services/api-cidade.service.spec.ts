import { TestBed } from '@angular/core/testing';

import { ApiCidadeService } from './api-cidade.service';

describe('ApiCidadeService', () => {
  let service: ApiCidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
