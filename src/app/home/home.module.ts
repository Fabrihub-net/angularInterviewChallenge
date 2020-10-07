import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
