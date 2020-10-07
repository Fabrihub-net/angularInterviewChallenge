import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                case url.match(/\/users\/profile\/\d+$/) && method === 'POST':
                    return updateProfile();
                case url.match(/\/users\/profile\/\d+$/) && method === 'GET':
                    return getProfile();
                case url.match(/\/users\/change-password\/\d+$/) && method === 'POST':
                    return changePassword();
                default:
                    return next.handle(request);
            }
        }

        // route functions

        function register() {
            const user = body;

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken');
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) {
                return error('Username or password is incorrect');
            }
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function getUsers() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            return ok(users);
        }

        function deleteUser() {
            if (!isLoggedIn()) {
                return unauthorized();
            }

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function updateProfile() {
            if (!isLoggedIn()) {
                return unauthorized();
            }

            const profileData = body;
            const userIndex = users.findIndex(a => a.id === idFromUrl());
            if (userIndex !== -1) {
                users[userIndex].profileData = profileData;
                localStorage.setItem('users', JSON.stringify(users));
            }

            return ok();
        }

        function getProfile() {
            if (!isLoggedIn()) {
                return unauthorized();
            }

            const userIndex = users.findIndex(a => a.id === idFromUrl());
            if (userIndex !== -1) {
                if (users[userIndex].profileData) {
                    return ok({ exist: true, profileData: users[userIndex].profileData });
                }
                return ok({ exist: false });
            }

            return unauthorized();
        }

        function changePassword() {
            if (!isLoggedIn()) {
                return unauthorized();
            }

            const userIndex = users.findIndex(a => a.id === idFromUrl());
            if (userIndex !== -1) {
                const passData = body;
                if (users[userIndex].password == passData.oldPass) {
                    users[userIndex].password = passData.newPass;
                    return ok();
                } else {
                    return error('Invalid OldPassword');
                }
            }

            return unauthorized();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}