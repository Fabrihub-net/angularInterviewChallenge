import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';

import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePassForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.changePassForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.changePassForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changePassForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.changePassword(this.f.oldPassword.value, this.f.newPassword.value)
      .subscribe(
        data => {
          this.authenticationService.logout();
          this.router.navigate(['/account/login']);
        },
        error => {
          this.loading = false;
        });
  }

}
