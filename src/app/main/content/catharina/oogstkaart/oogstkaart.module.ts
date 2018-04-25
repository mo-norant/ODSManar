import { ItemComponent } from './item/item.component';
import { MatStepper, MatStepperModule } from '@angular/material';
import { OogstkaartService } from './oogstkaart.service';
import { OogstkaartlistComponent } from './oogstkaartlist/oogstkaartlist.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { OogstkaartformComponent } from './oogstkaartform/oogstkaartform.component';
import { AgmCoreModule } from '@agm/core';
import { TokenGuard } from '../../../../auth/token.guard';
import { AuthModule } from 'app/auth/auth.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ConfirmdeleteComponent } from './item/confirmdelete/confirmdelete.component';
import { FileDropModule } from 'ngx-file-drop';
import { ModalGalleryModule } from 'angular-modal-gallery';

const routes: Routes = [
  {
      path     : 'catharina/oostkaart',
      component: OogstkaartlistComponent,
      canActivate: [TokenGuard]

      
  },
  {
    path     : 'catharina/newproduct',
    component: OogstkaartformComponent,
    canActivate: [TokenGuard]

  },
  {
    path     : 'catharina/item/:id',
    component: ItemComponent,
    canActivate: [TokenGuard]
  }
]

@NgModule({
  imports: [
    FileDropModule,
    CommonModule,
    FuseSharedModule,
    NgxDatatableModule,
    AuthModule,
  RouterModule.forChild(routes),
  ModalGalleryModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyC20RLiyVsvMLncki9JQdKuIpHdBdSXTY0'
  }),
  ],
  declarations: [ OogstkaartformComponent, OogstkaartlistComponent, ItemComponent, ConfirmdeleteComponent],
  entryComponents: [ConfirmdeleteComponent ],
  providers: [OogstkaartService]
})
export class OogstkaartModule { }
