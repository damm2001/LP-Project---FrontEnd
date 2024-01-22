import { TestBed } from '@angular/core/testing';

import { EjerciciosSerService } from './ejercicios-ser.service';

describe('EjerciciosSerService', () => {
  let service: EjerciciosSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjerciciosSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
