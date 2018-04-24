import { LandermapService } from './../../landermap.service';
import { Component, OnInit } from '@angular/core';
import { OogstKaartItem } from '../../../../../models/models';
import { FuseConfigService } from '../../../../../../@fuse/services/config.service';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { Router } from '@angular/router';
import { AgmMap } from '@agm/core';
import { Utils } from '../../../../../models/Util';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.scss'],
  animations : fuseAnimations
})
export class DetailviewComponent implements OnInit {



  item : OogstKaartItem;
  zoom  = 10;
  navigation;
  hidemap : boolean;
  rootplace : string;

  imagesources : string [] = [];
  currentsrc: string;

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};

  constructor(private router : Router, private landerservice: LandermapService, private fuseConfig: FuseConfigService ) {

    this.item = this.landerservice.oogstkaartitem;
    this.rootplace = Utils.getRoot().replace("/api", "");
    if(this.item === undefined){
      this.router.navigate(['lander/map'])
    }
    else{
     this.currentsrc = this.rootplace + '/uploads/image/' + this.item.avatar.uri;
      this.item.gallery.forEach(element => {
        this.imagesources.push(this.rootplace +  '/uploads/image/' + element.uri)
      });

      

    }
    
    
    this.fuseConfig.setConfig({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.navigation = this.landerservice.navigation;
   


   }

  ngOnInit() {
    
  }

  checkmap($event){
    if($event.index === 3){
      this.hidemap = false;
    }
    else{
      this.hidemap = true;
    }
  }

  loading: boolean = true
onLoad() {
    this.loading = false;
}

test($event){

}

}
