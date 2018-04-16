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

    loading: boolean;
    err: string;

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

        this.loading = true;

        setTimeout(() => {

            if (!this.auth.tokenExpired() && this.auth.hasToken()) {
                this.router.navigate(['/catharina']);
            }
            else {
                this.loading = false;
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

        this.loading = true;

        this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
            this.auth.saveToken(res);
            this.router.navigate(['catharina']);

        }, err => {
            this.err = "Gebruikersnaam of/en  wachtwoord zijn verkeerd";
            this.loading = false;
        }, () => {
        this.loading = false;
        })
    }



}
