import { OogstKaartItem } from './../../../../../models/models';
import { OogstkaartService } from './../oogstkaart.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'app-oogstkaartlist',
  templateUrl: './oogstkaartlist.component.html',
  styleUrls: ['./oogstkaartlist.component.scss']
})
export class OogstkaartlistComponent implements OnInit {

  rows: any[];
  loadingIndicator = true;
  reorderable = true;
  temp: any[];
  searchstring: string;


  filtered: any[];

  constructor(private oogstkaartservice: OogstkaartService, private router: Router) {

  }

  ngOnInit() {
    this.oogstkaartservice.GetOogstkaartitems().subscribe(res => {
      this.loadingIndicator = false;
      this.rows = res;
      this.filtered = this.rows;

    })
  }

  onUserEvent(e) {
    if (e.type == "click") {
      let item: OogstKaartItem = e.row;
      this.router.navigate(['catharina/item/', item.oogstkaartItemID]);


    }
  }

  search($event) {

    $event = $event.toLowerCase();
    
    if($event === ''){
        this.filtered = this.rows;
    }
    else{
      console.log($event);
      this.filtered = this.rows.filter((i) => i.artikelnaam.toLowerCase().indexOf($event) >= 0 || i.category.toLowerCase().indexOf($event) >= 0 || i.omschrijving.toLowerCase().indexOf($event) >= 0  );
    }



  }

}
