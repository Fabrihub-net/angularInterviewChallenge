import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUsersComponent } from './admin/components/manage-users/manage-users.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';

import { Role } from './models/role';
import { AuthGuard } from './guards/auth.guard';

import { ProfileResolverService } from './resolvers/profile-resolver.service';
import { UserResolverService } from './resolvers/user-resolver.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
   {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // resolve: {
    //   profile: ProfileResolverService
    // },
    // canActivate: [ UserAuthGuard]
  },
  {
    path: 'auth',
    children: [
      {
        path:'login',
        component: LoginComponent,
      },
      {
        path:'register',
        component: RegisterComponent,
      },
    ]
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent,
    // resolve: {
    //   allUsers: UserResolverService
    // },
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'change-pass', // unknown path
    component: ChangePasswordComponent
  },
  {
    path: '**', // unknown path
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
