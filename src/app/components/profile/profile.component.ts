import { Component, OnInit } from '@angular/core';
import { Role } from '@app/models/role';
import { User } from '@app/models/user';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  userId: number;

  constructor(
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => {
      this.userId = x.id
    });
  }

  ngOnInit(): void {
    this.authService.getById(this.userId).subscribe((u) => {
      this.currentUser = u
      console.log(this.currentUser);
    })
    this.currentUser = this.authService.currentUserValue;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
}
