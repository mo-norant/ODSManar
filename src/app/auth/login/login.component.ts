import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations

})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginFormErrors: any;

    color = 'primary';
    mode = 'indeterminate';

    loginLoad: boolean = true;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private router: Router
    ) {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.loginFormErrors = {
            email: {},
            password: {}
        };


    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });


        this.locallogin();
    }

    private locallogin() {

        setTimeout(() => {

            if (!this.auth.tokenExpired() && this.auth.hasToken()) {
                this.router.navigate(['/catharina']);
            }
            else {
                this.loginLoad = false;
            }
        
        },
            500);

        
    }

    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    login() {
        this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
            this.auth.saveToken(res);
            this.router.navigate(['catharina']);

        }, err => {
            console.log(err)
        }, () => {

        })
    }



}
