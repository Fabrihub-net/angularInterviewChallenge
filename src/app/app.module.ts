import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { FakeBackendInterceptor } from './shared/interceptors/fake-backend.interceptor';
import { EmptyLayoutComponent } from './shared/layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { MainHeaderComponent } from './shared/layouts/main-layout/main-header/main-header.component';
import { MainFooterComponent } from './shared/layouts/main-layout/main-footer/main-footer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    EmptyLayoutComponent,
    MainLayoutComponent,
    MainHeaderComponent,
    MainFooterComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
