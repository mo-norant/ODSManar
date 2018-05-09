import { LandermapService } from './../landermap.service';
import { HttpClient } from '@angular/common/http';
import { OogstKaartItem } from './../../../../models/models';
import { Component, Inject, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as _ from "lodash";
import { ItemviewComponent } from './itemview/itemview.component';
import { Utils } from '../../../../models/Util';
import { Router } from '@angular/router';



@Component({
  selector: 'app-oogstkaart-map',
  templateUrl: './oogstkaart-map.component.html',
  styleUrls: ['./oogstkaart-map.component.scss']
})

export class OogstkaartMapComponent implements OnInit {

  oogstkaartitems: OogstKaartItem[]
  filtered : OogstKaartItem[]

  zoom = 7
  itemsloading: boolean
  navigation
  artikelview: boolean;
  rootplace: string;

  link = 'Oogstkaart/mapview';

 

  filters = {
    categorie: {
      jansenprofiel: false,
      constructieprofiel: false,
      deur: false,
      raam: false,
      geveldeel: false,
      overige: false
    },
    serie: {
      ART15 : false,
      janisolARTE: false,
      economy: false,
      janisol : false,
      janisolHI: false,
      janisol2: false,
      janisolC4:false,
      jansenViss:false
    }
  }

  icons: [
    { constructieprofiel: "/path" },
    { jansenprofiel: "/path" },
    { deur: "/path" },
    { raam: "/path" },
    { geveldeel: "/path" },
    { overige: "/path" }
  ]

  filtersid: string[] = [];

  constructor(
    private fuseConfig: FuseConfigService,
    private http: HttpClient,
    public dialog: MatDialog,
    public landermapservice: LandermapService,
    private router: Router
  ) {


    this.fuseConfig.setConfig({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.rootplace = Utils.getRoot().replace("/api", "");

  }

  ngOnInit() {

    this.http.get<OogstKaartItem[]>(Utils.getRoot() + this.link).subscribe(res => {

      this.oogstkaartitems = res;
      this.filtered = this.oogstkaartitems;
      this.itemsloading = true;
    }, err => {
      this.itemsloading = true;
    })

  }

  opendialog(item: OogstKaartItem): void {



    let dialogRef = this.dialog.open(ItemviewComponent, {
      data: {
        item: item,
        id: item.oogstkaartItemID
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  filtertoggle($event) {


    let tempcategorie = []
    let tempmerklist = []

    for (let key in this.filters.categorie) {
      if (this.filters.categorie[key]) {
        tempcategorie.push(key);
      }
    }

    for (let key in this.filters.serie) {
      if (this.filters.serie[key]) {
        tempmerklist.push(key);
      }
    }

    if(tempcategorie.length != 0){
      this.filtered = [];
      tempcategorie.forEach(category => {
        this.oogstkaartitems.forEach(element => {
          if(element.category === category){
            this.filtered.push(element);
          }
        });
      });
    }
    if(tempmerklist.length != 0){
      this.filtered = [];
      tempmerklist.forEach(merk => {
        this.oogstkaartitems.forEach(element => {
          if(element.jansenserie.toLowerCase() === merk.toLowerCase()){
            this.filtered.push(element);
          }
        });
      });
    }
    else{
      this.filtered = this.oogstkaartitems;
    }


  }


  filterCategory(){
    
  }


  loading: boolean = true
  onLoad() {
    this.loading = false;
  }


  openDetailview(id: number) {
    this.landermapservice.oogstkaartitem = this.oogstkaartitems.filter(i => i.oogstkaartItemID == id)[0];
    this.router.navigate(['lander/detail/', id]);
  }



}



