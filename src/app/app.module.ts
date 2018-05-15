import { GeneralService } from './general.service';
import { MatStepperModule } from '@angular/material';
import { TokenGuard } from './auth/token.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { CatharinaModule } from './main/content/catharina/catharina.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StratusModule } from './main/content/stratus/stratus.module';


const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'catharina',
        loadChildren: './main/content/catharina/catharina.module#CatharinaModule'
    },
    {
        path: 'stratus',
        loadChildren: './main/content/stratus/stratus.module#StratusModule'
    },
    {
        path: 'lander',
        loadChildren: './main/content/front/front.module#FrontModule'
    },
    {
        path: '**',
        redirectTo: 'lander'
    }
];


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatStepperModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        NgbModule.forRoot(),
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        CatharinaModule,
        AuthModule,
        StratusModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [GeneralService]
})
export class AppModule {
}
