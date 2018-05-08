import { RegisterUser, AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: fuseAnimations

})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    registerFormErrors: any;

    loading : boolean;
    err;

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

        this.registerFormErrors = {
            name: {},
            email: {},
            password: {},
            passwordConfirm: {}
        };
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            Name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required]]
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    onRegisterFormValuesChanged() {
        for (const field in this.registerFormErrors) {
            if (!this.registerFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }

    register() {

       if(this.checkPasswords(this.registerForm.value.password, this.registerForm.value.passwordConfirm)){
           let user : RegisterUser = new RegisterUser(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.passwordConfirm, this.registerForm.value.Name);
           
           this.loading = true;
           this.auth.createUser(user).subscribe(res => {
               this.auth.login(this.registerForm.value.email, this.registerForm.value.password).subscribe(res => {
                this.auth.saveToken(res);
                this.router.navigate(['auth/companyregistration']);
               }, err => this.err = err, () => this.loading = false);
           })
       }else{
           console.log("wachtwoorden zijn niet")
       }

    }

    private checkPasswords(password: string, password2: string){
        if(password === password2){
            return true
        }
        return false;
    }

}






