import { ConfirmdeleteComponent } from './confirmdelete/confirmdelete.component';
import { OogstKaartItem, Specificatie } from './../../../../../models/models';
import { OogstkaartService } from './../oogstkaart.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  secondFormGroup: FormGroup;

  oogstkaartitem: OogstKaartItem;

  buttonlock: boolean ;
  changed: boolean;
  loading: boolean;
  constructor(private dialog: MatDialog, private OogstkaartService: OogstkaartService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, private _formBuilder : FormBuilder) {

   }

  ngOnInit() {



    this.route.params.subscribe(data => {
    this.loading = true
      this.OogstkaartService.getOogstkaartItem(data['id']).subscribe(res => {
        this.oogstkaartitem = res;
        this.secondFormGroup = this._formBuilder.group({
          omschrijving: [res.omschrijving, Validators.required],
          jansenserie: [res.jansenserie, Validators.required],
          vraagPrijsPerEenheid: [res.vraagPrijsPerEenheid, [Validators.required, Validators.pattern('^[0-9]{1,45}$')]],
          vraagPrijsTotaal: [res.vraagPrijsTotaal, [Validators.required, Validators.pattern('^[0-9]{1,45}$')]],
          artikelnaam:  [res.artikelnaam, Validators.required],
          categorie: [res.category, Validators.required],
          hoeveelheid: [res.hoeveelheid, [Validators.required, Validators.pattern('^[0-9]{1,45}$')]],
          concept: [res.concept, Validators.required],
          datumBeschikbaar: [res.datumBeschikbaar, Validators.required]
        });
        this.onChanges();

      }, err => {
        this.loading = false;
        this.snackBar.open("Geen product gevonden", "", {
          duration: 2000
        }); 
        this.router.navigate(["catharina/oostkaart"])
      }, () => this.loading = false)
    });



  }


  setproductstatus(){
    if(!this.buttonlock){
      this.OogstkaartService.PostSetStatusProduct(this.oogstkaartitem.oogstkaartItemID).subscribe(res => {
        this.oogstkaartitem.onlineStatus = !this.oogstkaartitem.onlineStatus;
        this.snackBar.open("Wijziging opgeslagen", "", {
          duration: 2000
        });
      
      }, err => {
        this.snackBar.open("Wijziging niet opgeslagen!", "", {
          duration: 2000
        }); 
      })
    }
  }

  deleteproduct(){
    let dialogRef = this.dialog.open(ConfirmdeleteComponent , {
      width: '600px',
      data: { name: this.oogstkaartitem.artikelnaam,  id: this.oogstkaartitem.oogstkaartItemID}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/catharina/oostkaart']);
    });  }

    onChanges(): void {
      this.secondFormGroup.valueChanges.subscribe(val => {
        this.changedstate();

        for (let key in val) {
          let value = val[key];
          this.oogstkaartitem[key] = value;
      }

      });
    }

    private changedstate(){
      if(this.secondFormGroup.valid){
        this.changed = true;

      }else{
        this.changed = false;
      }
    }


    removeSpecificatie( i : number){
      if (i !== -1) {
        this.changedstate();
        this.oogstkaartitem.specificaties.splice(i, 1);
      }
    }

    addSpecificatie(){
      this.changedstate();
      this.oogstkaartitem.specificaties.push(new Specificatie());
      
    }

    updateItem(){
            this.loading = true;
            this.OogstkaartService.UpdateOogstkaartitem(this.oogstkaartitem).subscribe(res => {this.changed = false}, err => this.loading = false , () => this.loading = false);
    }

}
 