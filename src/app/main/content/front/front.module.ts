import { LandermapService } from './landermap.service';
import { FuseNavigationModule } from './../../../../@fuse/components/navigation/navigation.module';
import { FuseConfigService } from '@fuse/services/config.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanderComponent } from 'app/main/content/front/lander/lander.component';
import { Route, RouterModule } from '@angular/router';
import { FuseSharedModule } from '../../@fuse/shared.module';
import { MaterialModule } from '../../../material/material.module';
import { FuseToolbarModule } from '../../toolbar/toolbar.module';
import { FuseModule } from '../../@fuse/fuse.module';
import { OogstkaartMapComponent } from './oogstkaart-map/oogstkaart-map.component';
import { AgmCoreModule  } from '@agm/core';
import { ItemviewComponent } from './oogstkaart-map/itemview/itemview.component';
import { DetailviewComponent } from './oogstkaart-map/detailview/detailview.component';
import { SliderModule } from 'angular-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalGalleryModule } from 'angular-modal-gallery';
import {CardModule} from 'primeng/card';

const routes: Route[] = [
  {
    path: '',
    component: LanderComponent,
  },
  {
    path: 'map',
    component: OogstkaartMapComponent,
  },
  {
    path: 'detail/:id',
    component: DetailviewComponent,
  },
];


@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    RouterModule.forChild(routes),
    SliderModule,
    MaterialModule,
    NgbModule,
    FuseNavigationModule,
    ModalGalleryModule,
    CardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC20RLiyVsvMLncki9JQdKuIpHdBdSXTY0'
    }),
  ],
  
  providers: [LandermapService],
  declarations: [LanderComponent, OogstkaartMapComponent, ItemviewComponent, DetailviewComponent ],
  entryComponents: [ItemviewComponent]
})
export class FrontModule { }
