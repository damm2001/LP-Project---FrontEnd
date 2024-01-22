import { TestBed } from '@angular/core/testing';

import { DatosProvedorService } from './datos-provedor.service';

describe('DatosProvedorService', () => {
  let service: DatosProvedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosProvedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
