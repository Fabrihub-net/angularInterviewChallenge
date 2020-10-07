import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/models/user';
import { confirmation } from '@app/registerFormcustomValidator';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  userId: number;
  currentUser: User;
  passwordStatue: boolean;
  oldPassStatue: boolean = true;
  passwordPatternStatue: boolean ;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.authService.currentUser.subscribe(x => {
      this.userId = x.id
    });
  }
  changePasswordForm: FormGroup;

  ngOnInit(): void {

    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9].{5,}$')]],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: [
          confirmation('newPassword', 'confirmPassword')
        ]
      }
    );
  }

  //get form controls to access on form values
  get f() { return this.changePasswordForm.controls; }

  changePassword(changePasswordForm) {
    if (changePasswordForm.valid) {
      this.authService.getById(this.userId).subscribe((u) => {
        this.currentUser = u
        console.log(this.currentUser);
        if (this.f.oldPassword.value === this.currentUser.password) {
          this.currentUser.password = this.f.newPassword.value
          this.authService.updateUser(this.userId, this.currentUser).subscribe(
            myUser => {
              this.passwordStatue = true;
              this.oldPassStatue = true;
              this.passwordPatternStatue = true ;
            }
          )
        } else {
          this.oldPassStatue = false;
        }
      })
    }else{
      this.passwordPatternStatue= false;
    }
  }
}
