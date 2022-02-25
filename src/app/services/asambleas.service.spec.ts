import { TestBed } from '@angular/core/testing';

import { AsambleasService } from './asambleas.service';

describe('AsambleasService', () => {
  let service: AsambleasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsambleasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
