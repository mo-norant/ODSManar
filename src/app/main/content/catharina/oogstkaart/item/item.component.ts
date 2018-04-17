import { ConfirmdeleteComponent } from './confirmdelete/confirmdelete.component';
import { OogstKaartItem } from './../../../../../models/models';
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
  constructor(private dialog: MatDialog, private OogstkaartService: OogstkaartService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, private _formBuilder : FormBuilder) { }

  ngOnInit() {



    this.route.params.subscribe(data => {

      this.OogstkaartService.getOogstkaartItem(data['id']).subscribe(res => {

        this.oogstkaartitem = res;

        this.secondFormGroup = this._formBuilder.group({
          omschrijving: [res.omschrijving, Validators.required],
          jansenserie: [res.jansenserie, Validators.required],
          vraagPrijsPerEenheid: [res.vraagPrijsPerEenheid, Validators.required],
          vraagPrijsTotaal: [res.vraagPrijsTotaal, Validators.required],
          artikelnaam:  [res.artikelnaam, Validators.required],
          categorie: [res.category, Validators.required],
          hoeveelheid: [res.hoeveelheid, Validators.required],
          concept: [res.concept, Validators.required]
          
        
    
        });
        this.onChanges();

      }, err => {
        this.snackBar.open("Geen product gevonden", "", {
          duration: 2000
        }); 
        this.router.navigate(["catharina/oostkaart"])
      })
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
      console.log('The dialog was closed');
    });  }

    onChanges(): void {
      this.secondFormGroup.valueChanges.subscribe(val => {
        this.changed = true;
        
      });
    }

}
 