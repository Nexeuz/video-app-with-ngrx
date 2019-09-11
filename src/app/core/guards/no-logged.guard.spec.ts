import { TestBed, async, inject } from '@angular/core/testing';

import { NoLoggedGuard } from './no-logged.guard';

describe('AuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoLoggedGuard]
    });
  });

  it('should ...', inject([NoLoggedGuard], (guard: NoLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
