import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    private _userService: UserService,
    public router: Router
    ) {
    this.authForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  authenticate() {
    if (this.router.url === '/login') {
      this._userService.loginUser(this.authForm.value)
      .subscribe((res) => {
        this._userService.setUser(res);
        this.router.navigate(['/users']);
      });
    } else {
      this._userService.registerUser(this.authForm.value)
      .subscribe(() => {
        this.router.navigateByUrl('/login');
      });
    }
  }

}
