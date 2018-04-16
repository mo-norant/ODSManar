import { Company, Weight, Address } from './../../models/models';
import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registercompany',
  templateUrl: './registercompany.component.html',
  styleUrls: ['./registercompany.component.scss'],
  animations: fuseAnimations

})
export class RegistercompanyComponent implements OnInit {

    registerForm: FormGroup;
    registerFormErrors: any;


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
        companyName: ['', Validators.required],
          street: ['', [Validators.required]],
          number: ['', [Validators.required]],
          zipcode: ['', [Validators.required]],
          city: ['', [Validators.required]],
          country: ['', [Validators.required]],
          phone: ['', [Validators.required]],

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

onsubmit(){

    let company : Company = new Company();
    company.companyName = this.registerForm.value.companyName;
    company.phone = this.registerForm.value.phone;
    
    let address: Address = new Address();
    address.street = this.registerForm.value.street;
    address.number = this.registerForm.value.number;
    address.city = this.registerForm.value.city;
    address.zipcode = this.registerForm.value.zipcode;
    address.country = this.registerForm.value.country;

    company.address = address;

      this.auth.postCompany(company).subscribe(res => {
          this.router.navigate(['/catharina']);
      });
}
}