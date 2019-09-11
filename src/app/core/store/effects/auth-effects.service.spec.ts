import { TestBed } from '@angular/core/testing';

import { AuthEffectsService } from './auth-effects.service';

describe('AuthEffectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthEffectsService = TestBed.get(AuthEffectsService);
    expect(service).toBeTruthy();
  });
});
