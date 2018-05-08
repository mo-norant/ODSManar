import { RegisterUser, AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { CustomValidators } from '@floydspace/ngx-validation';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: fuseAnimations

})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    registerFormErrors: any;
    terms: boolean = false;
    loading : boolean;
    err : any;
    passwordnotsame: string;

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
            password: ['', [Validators.required, Validators.pattern(/(?=^.{8,}$)((?!.*\s)(?=.*[A-Z])(?=.*[a-z]))((?=(.*\d){1,})|(?=(.*\W){1,}))^.*$/)]],
            passwordConfirm: ['', [Validators.required]],
            terms : ['', [Validators.required]]
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
               }, err => {
                console.log(err)

                if(err[0].code === 'DuplicateUserName'){
                    this.err = 'Er bestaat al gebruiker met dezelfde login'
                }

                else{
                    this.err = 'andere fout'
                }

               }, () => this.loading = false);
           }, () => {
               this.loading = false;
           })
       }

    }

    private checkPasswords(password: string, password2: string){
        if(password === password2){
            this.passwordnotsame = null;
            return true
        }
        this.passwordnotsame = "Wachtwoorden komen niet overeen"
        return false;
    }

}






