import { TestBed } from '@angular/core/testing';

import { UsernameUnico.DirectiveGuard } from './username-unico.directive.guard';

describe('UsernameUnico.DirectiveGuard', () => {
  let guard: UsernameUnico.DirectiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsernameUnico.DirectiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
