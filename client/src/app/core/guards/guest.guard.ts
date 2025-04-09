import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  tokenService.isAuthentication.subscribe({
    next: (value) => { // this is the opposite of the auth guard.
      if (value) {
        router.navigate(['todo']); // go to todo if aleready logged in.
      }
    },
  });

  return true;
};