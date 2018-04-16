
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule, Route } from '@angular/router';
import { OogstkaartModule } from './oogstkaart/oogstkaart.module';
import { TokenGuard } from '../../../auth/token.guard';
import { AuthModule } from '../../../auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FuseWidgetModule } from '@fuse/components';


const routes: Route[] = [
  {
    path: 'catharina',
    component: DashboardComponent,
    canActivate: [TokenGuard]
  },
  {
    path: 'catharina/oostkaart',
    loadChildren: './oogstkaart/oogstkaart.module#OogstkaartModule',
    canActivateChild: [TokenGuard]
  },
  {
    path: 'catharina/**',
    redirectTo: 'catharina'
  },

];


@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    FuseSharedModule,
    FuseWidgetModule,
    OogstkaartModule,
    RouterModule.forChild(routes),

  ],
  declarations: [DashboardComponent]
})
export class CatharinaModule { }
