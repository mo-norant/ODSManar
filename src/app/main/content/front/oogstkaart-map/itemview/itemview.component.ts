import { LandermapService } from './../../landermap.service';
import { HttpClient } from '@angular/common/http';
import { OogstKaartItem } from './../../../../../models/models';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Utils } from '../../../../../models/Util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.component.html',
  styleUrls: ['./itemview.component.scss'],
  animations : fuseAnimations

})
export class ItemviewComponent implements OnInit {

    card9Expanded = false;

    item : OogstKaartItem;

  constructor(
    public dialogRef: MatDialogRef<ItemviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private landermapservice: LandermapService, private router : Router) {

      this.item = data.item;

      this.landermapservice.oogstkaartitem = this.item;

     }

  onNoClick(): void {
    this.dialogRef.close();
    
  }

  ngOnInit() {
    this.http.post<number>(Utils.getRoot() +'/api/Oogstkaart/view/' + this.data.id, null).subscribe(
    res => {
      this.item.Views = res;
    }
      
    )
  }

  openDetailview(){

    this.router.navigate(['lander/detail', this.item.oogstkaartItemID]);
    this.dialogRef.close();
  }

}
