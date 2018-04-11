import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class FuseToolbarComponent
{
    userStatusOptions: any[];
    languages: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    noNav: boolean;
    user

    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private sidebarService: FuseSidebarService,
        private translate: TranslateService,
        private auth: AuthService
    )
    {
        if(this.auth.hasToken())
        this.auth.getUserInfo().subscribe(res =>{
            this.user = res
        } )
       

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showLoadingBar = false;
                }
            });

        this.fuseConfig.onConfigChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
            this.noNav = settings.layout.navigation === 'none';
        });

    }

    toggleSidebarOpened(key)
    {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    search(value)
    {
        // Do your search here...
        console.log(value);
    }

    logout(){

            this.auth.removeToken();
            this.router.navigate(['/auth'])

    }

   
}
