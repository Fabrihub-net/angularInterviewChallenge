import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { confirmation } from '../../../registerFormcustomValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userInfo;
  comingData;
  foundedEmail;
  hello55;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

 
   }
  get userName() {
    return this.registerForm.get("username");
  }

  get password() {
    return this.registerForm.get("password");
  }
// Uid;

  
  ngOnInit() {
    this.registerForm = this.fb.group({
      // authCredentialsDto: this.fb.group({
      username: ["",[Validators.required, Validators.pattern('^[a-z|A-Z]+(?: [a-z|A-Z]+)*$')]],
      password: ["", [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9].{5,}$')]],
      confirmPassword: ["", [Validators.required]],
      firstname: ["", [Validators.required, Validators.pattern('^[a-z|A-Z]+(?: [a-z|A-Z]+)*$')]],
      lastname: ["", [Validators.required, Validators.pattern('^[a-z|A-Z]+(?: [a-z|A-Z]+)*$')]],
      email: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@gmail|yahoo\.[a-zA-Z]{2,}$')]],
      gender: ["", [Validators.required]],
      age: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      country: ["", [Validators.required]],
      city: ["", [Validators.required]],
      address: ["", [Validators.required]]
    },
    {
      validator: [
        confirmation('password', 'confirmPassword')
      ]
    }
    )
    // createProfileDto: new FormGroup({
  
    // })

    // });

  }

  onSubmit(registerForm) {
    if (registerForm.valid) {
      this.userInfo = registerForm.value;
        this.authService.postUser(this.userInfo).subscribe(data => {          
          this.userInfo = data;
          localStorage.setItem("currentUser", JSON.stringify(this.userInfo));
        })
          this.router.navigate(['/']);
      }
    }
  }

    // this.Uid=JSON.parse(localStorage.getItem("currentUser"));
    // if (registrationForm.valid) {
    //   this.userInfo = registrationForm.value;
    //   // this.foundedEmail = this.comingData.find(element => element.email == this.userInfo.email);
    //   // console.log(this.foundedEmail)
    //   // if (this.foundedEmail) {      
    //   //     let emailError = document.getElementById('emailError')
    //   //     emailError.innerHTML="email is exist"
    //   // } else {
    //     this.authService.register(this.userInfo).subscribe(data => {
    //       this.userInfo = data;
    //       localStorage.setItem("currentUser", JSON.stringify(this.userInfo));

    //     })
    //   // }
    // }

//   }
// }