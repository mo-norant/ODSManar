import { OogstKaartItem } from './../../../../../models/models';
import { OogstkaartService } from './../oogstkaart.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oogstkaartlist',
  templateUrl: './oogstkaartlist.component.html',
  styleUrls: ['./oogstkaartlist.component.scss']
})
export class OogstkaartlistComponent implements OnInit {

  rows: any[];
  loadingIndicator = true;
  reorderable = true;

  constructor(private oogstkaartservice: OogstkaartService, private router : Router)
  {
    
  }

  ngOnInit()
  {
      this.oogstkaartservice.GetOogstkaartitems().subscribe(res => {
        this.loadingIndicator = false;
        this.rows = res;
      })
  }

  onUserEvent ( e ) {
    if ( e.type == "click" ) {
        let item : OogstKaartItem = e.row;
        this.router.navigate(['catharina/item/', item.oogstkaartItemID]);
       

    }
} 

}
