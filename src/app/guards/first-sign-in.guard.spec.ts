import { TestBed, async, inject } from '@angular/core/testing';

import { FirstSignInGuard } from './first-sign-in.guard';

describe('FirstSignInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstSignInGuard]
    });
  });

  it('should ...', inject([FirstSignInGuard], (guard: FirstSignInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
