import { LandermapService } from './../landermap.service';
import { HttpClient } from '@angular/common/http';
import { OogstKaartItem } from './../../../../models/models';
import { Component, Inject, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as _ from "lodash";
import { ItemviewComponent } from './itemview/itemview.component';
import { Utils } from '../../../../models/Util';



@Component({
  selector: 'app-oogstkaart-map',
  templateUrl: './oogstkaart-map.component.html',
  styleUrls: ['./oogstkaart-map.component.scss']
})

export class OogstkaartMapComponent implements OnInit {

  oogstkaartitems: OogstKaartItem[]

  zoom = 7
  itemsloading : boolean

  navigation

  link = 'api/Oogstkaart/mapview';

  filters = {
    categorie: [
      { jansenprofiel: false },
      { constructieprofiel: false },
      { deur: false },
      { raam: false },
      { geveldeel: false },
      { overige: false }
    ],
   jansenserie :[
    { art15: false},
     { janisolarte: false},
     { economy: false},
     { janisol: false},
     { janisolhi: false},
     { janisol2: false},
     { janisolc4: false},
     { jansenviss: false}
   ],
   concept: [
     {tekoop: false},
     {tehuur: false},
     {tekoopentehuur: false}

   ]
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
  filterconcept: string[] = [];
  filterserie: string[] = [];

  constructor(
    private fuseConfig: FuseConfigService,
    private http: HttpClient,
    public dialog: MatDialog,
    public landermapservice: LandermapService
  ) {


    this.fuseConfig.setConfig({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });


  }

  ngOnInit() {

    this.http.get<OogstKaartItem[]>(Utils.getRoot() + this.link).subscribe(res => {

      this.oogstkaartitems = res;
      this.activatefilters(res);
      this.itemsloading = true;
    }, err => {
      this.itemsloading = true;
    })

  }

  opendialog(item: OogstKaartItem): void {

    
    let dialogRef = this.dialog.open(ItemviewComponent, {
      data: { item: item,
      id : item.oogstkaartItemID }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  filtertoggle($event) {

    console.log($event)

    if ($event.source.id in this.oogstkaartitems) {
    }

   


  }

  activatefilters(oogstkaartitems: OogstKaartItem[]) {

    oogstkaartitems.forEach(element => {
      this.filtersid.push(element.category);
      
      this.filterserie.push(element.jansenserie.toLowerCase().replace(/ /g,'').replace('-',''));
      this.filterconcept.push(element.concept.toLowerCase().replace(/ /g,''));
    });

    console.log(this.filterserie);
    console.log(this.filterconcept);

    this.filtersid = _.uniq(this.filtersid);
    this.filterserie = _.uniq(this.filterserie);
    this.filterconcept = _.uniq(this.filterconcept);

    this.filtersid.forEach(element => {
      this.filters.categorie[element] = true;
    });

    this.filterconcept.forEach(element => {
      this.filters.concept[element] = true;
    });

    this.filterserie.forEach(element => {
      this.filters.jansenserie[element] = true;
    });


  }





}

