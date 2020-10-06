import { Component } from '@angular/core';
import { User } from './models/user';
import { first } from 'rxjs/operators';
import { Role } from 'src/app/models/role';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import * as data from './data/database.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angularInterviewChallenge';
  currentUser: User;
  constructor(
    private authService: AuthService,
    private router: Router

  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
