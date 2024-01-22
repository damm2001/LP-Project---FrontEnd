import { TestBed } from '@angular/core/testing';

import { RegistroServService } from './registro-serv.service';

describe('RegistroServService', () => {
  let service: RegistroServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
