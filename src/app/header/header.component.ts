import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navLinks = [
    {
      name: 'home',
      router: '/'
    },
    {
      name: 'users',
      router: '/users'
    },
    {
      name: 'register',
      router: '/register'
    },
    {
      name: 'login',
      router: '/login'
    },
  ];
  
  showMobileMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

}
