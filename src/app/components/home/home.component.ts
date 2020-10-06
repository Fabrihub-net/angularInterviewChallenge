import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // loading = false;
  // currentUser: User;
  // userFromApi: User;

  constructor(
    private authService: AuthService,
    private router: Router

  ) { 
    // this.authService.currentUser.subscribe(x => this.currentUser = x);

   }

  ngOnInit(): void {
    // this.currentUser = this.authService.currentUserValue;
    // this.loading = true;
    // this.authService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
    //     this.loading = false;
    //     this.userFromApi = user;
    // });
  }

  // get isAdmin() {
  //   return this.currentUser && this.currentUser.role === Role.Admin;
  // }

  // logout() {
  //   this.authService.logout();
  //   this.router.navigate(['/home']);
  // }

}
