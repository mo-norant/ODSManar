
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule, Route } from '@angular/router';
import { TokenGuard } from '../../../auth/token.guard';
import { AuthModule } from '../../../auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FuseWidgetModule } from '@fuse/components';
import { UsermanagerlistComponent } from './usermanagerlist/usermanagerlist.component';
import { MaterialModule } from '../../../material/material.module';


const routes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'dashboard/usermanager',
    component: UsermanagerlistComponent,
    canActivateChild: [TokenGuard]
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
    MaterialModule,
    RouterModule.forChild(routes),

  ],
  declarations: [DashboardComponent, UsermanagerlistComponent]
})
export class StratusModule { }
