import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  loading = false;
  users: User[] = [];
  
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.authService.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
    });
  }

}
