import { TokenGuard } from './token.guard';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { RegisterComponent } from './register/register.component';
import { RegistercompanyComponent } from './registercompany/registercompany.component';


const appRoutes: Routes = [
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: 'auth/companyregistration',
    component: RegistercompanyComponent
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FuseSharedModule],
  declarations: [LoginComponent, RegisterComponent, RegistercompanyComponent],
  providers: [AuthService, TokenGuard]
})
export class AuthModule { }
