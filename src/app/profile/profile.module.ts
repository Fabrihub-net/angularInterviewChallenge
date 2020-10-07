import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/modules/shared/shared.module';



@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    QuillModule.forRoot(),
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
