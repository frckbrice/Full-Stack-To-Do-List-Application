import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);  // could also be called within the constructor
  // this is a design decision, and it provides better testability and separation of concerns.
  const router = inject(Router);

  tokenService.isAuthentication.subscribe({
    next: (value) => {
      if (value) {  // intercep the request and insert the bearer token in the authorization header
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenService.getToken()}`,
          },
        });
      }
    },
  });

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status === 401) {
        tokenService.removeToken();
        router.navigate(['']);  // redirect to login for a 401 error
      }
      const error = e.error?.error?.message || e.statusText;
      return throwError(() => error);
    })
  );
};