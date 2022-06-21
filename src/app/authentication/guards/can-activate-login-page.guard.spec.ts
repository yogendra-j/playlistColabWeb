import { TestBed } from '@angular/core/testing';

import { CanActivateLoginPageGuard } from './can-activate-login-page.guard';

describe('CanActivateLoginPageGuard', () => {
  let guard: CanActivateLoginPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateLoginPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
