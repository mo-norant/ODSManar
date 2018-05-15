import { FuseToolbarModule } from 'app/main/toolbar/toolbar.module';
import { FuseQuickPanelModule } from 'app/main/quick-panel/quick-panel.module';
import { FuseNavbarModule } from 'app/main/navbar/navbar.module';
import { FuseFooterModule } from 'app/main/footer/footer.module';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import {FuseNavigationModule, FuseSearchBarModule, FuseShortcutsModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';


import { FuseMainComponent } from './main.component';
import { FuseContentModule } from './content/content.module';


@NgModule({
    declarations: [
        FuseMainComponent,
    ],
    imports     : [
        RouterModule,
        MatSidenavModule,
        FuseSharedModule,
        FuseThemeOptionsModule,
        FuseNavigationModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        FuseSidebarModule,
        
        FuseContentModule,
        FuseFooterModule,
        FuseNavbarModule,
        FuseQuickPanelModule,
        FuseToolbarModule,
    ],
    exports     : [
        FuseMainComponent
    ]
})
export class FuseMainModule
{
}
