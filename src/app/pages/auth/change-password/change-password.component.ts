import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  user: any = JSON.parse(localStorage.getItem('user'));
  oldPasswordHash: string;
  errorMsg: string;

  constructor(private _userService: UserService, private http$: HttpClient) {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.http$.get(`http://localhost:4200/users/${this.user.id}`)
    .subscribe((res) => {
      this.oldPasswordHash = res['password'];
    });
  }

  changePassword(): void {
    const oldPasswordValue = this.changePasswordForm.get('oldPassword').value;
    const newPasswordValue = this.changePasswordForm.get('newPassword').value;
    const confirmPasswordValue = this.changePasswordForm.get('confirmPassword').value;
    if (this.oldPasswordHash === oldPasswordValue && newPasswordValue === confirmPasswordValue) {
      this.http$.put(`http://localhost:4200/users/${this.user.id}`, {...this.user, password: newPasswordValue}).subscribe();
      this._userService.updateUser();
    } else {
      this.errorMsg = 'Invalid Passwords';
    }
  }

}
