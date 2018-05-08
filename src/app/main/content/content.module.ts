import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { ModalGalleryModule } from 'angular-modal-gallery';
import { FuseContentComponent } from 'app/main/content/content.component';

@NgModule({
    declarations: [
        FuseContentComponent
    ],
    imports     : [
        RouterModule,
        FuseSharedModule,
        ModalGalleryModule.forRoot()
    ],
    exports: [
        FuseContentComponent
    ]
})
export class FuseContentModule
{
}
