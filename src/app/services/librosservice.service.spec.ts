import { TestBed } from '@angular/core/testing';

import { LibrosserviceService } from './librosservice.service';

describe('LibrosserviceService', () => {
  let service: LibrosserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrosserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
