import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;

  constructor(private http$: HttpClient) { }

  ngOnInit(): void {
    this.http$.get('http://localhost:4200/users')
    .subscribe((res) => {
      this.users = res;
    });
  }

  deleteUser(id) {
    console.log(id);
  }

}
