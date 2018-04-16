import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lander',
  templateUrl: './lander.component.html',
  styleUrls: ['./lander.component.scss']
})
export class LanderComponent implements OnInit {


  navigation = 
    [{
      'title' : 'Login',
      'type' : 'item',
      'icon' : 'assignment_ind',
      'url' : '/auth'
  },
  {
    'title' : 'Register',
    'type' : 'item',
    'icon' : 'add',
    'url' : '/auth/register'
},
{
  'title' : 'Oogstkaart',
  'type' : 'item',
  'icon' : 'map',
  'url' : '/lander/map'
}]


  constructor(
    private fuseConfig: FuseConfigService,
    private router: Router
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
    
  }

}
