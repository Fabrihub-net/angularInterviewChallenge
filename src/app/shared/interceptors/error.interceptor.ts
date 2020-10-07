
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err)
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.router.navigate(['/account/login']);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}