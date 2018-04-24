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

    rootplace : string;

  constructor(
    public dialogRef: MatDialogRef<ItemviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private landermapservice: LandermapService, private router : Router) {

      this.item = data.item;

      this.landermapservice.oogstkaartitem = this.item;
      this.rootplace = Utils.getRoot().replace("/api", "");
     }

  onNoClick(): void {
    this.dialogRef.close();
    
  }

  ngOnInit() {
    this.http.post<number>(Utils.getRoot() +'Oogstkaart/view/' + this.data.id, null).subscribe(
    res => {
      this.item.Views = res;
    }
      
    )
  }

  openDetailview(){

    this.router.navigate(['lander/detail', this.item.oogstkaartItemID]);
    this.dialogRef.close();
  }

  loading: boolean = true
onLoad() {
    this.loading = false;
}

}
