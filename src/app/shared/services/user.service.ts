import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: {
    name: string;
    email: string;
    token: string;
  }
  isLogged: boolean;

  constructor(
    private http$: HttpClient,
    private router: Router
  ) {
    this.updateUser();
  }

  loginUser(userData) {
    return this.http$.post('http://localhost:4200/login', userData);
  }
  registerUser(userData) {
    return this.http$.post('http://localhost:4200/register', userData)
  }
  updateUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.isLogged = !!(this.user && this.user.token);
  }

  setUser(userData) {
    this.user = userData;
    console.log(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    this.updateUser();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.updateUser();
    this.isLogged = false;
  }
}