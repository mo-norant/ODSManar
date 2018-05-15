
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule, Route } from '@angular/router';
import { TokenGuard } from '../../../auth/token.guard';
import { AuthModule } from '../../../auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FuseWidgetModule } from '@fuse/components';


const routes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'dashboard/**',
    redirectTo: 'dashboard'
  },

];


@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    FuseSharedModule,
    FuseWidgetModule,
    RouterModule.forChild(routes),

  ],
  declarations: [DashboardComponent]
})
export class StratusModule { }
