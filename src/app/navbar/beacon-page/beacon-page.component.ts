import { Component, OnInit } from '@angular/core';
import { BeaconListComponent } from '../beacon-list/beacon-list.component'
import { BeaconSearchComponent } from '../beacon-search/beacon-search.component'
import { MapComponent } from '../map/map.component'

@Component({
  selector: 'app-beacon-page',
  templateUrl: './beacon-page.component.html',
  styleUrls: ['./beacon-page.component.css']
})
export class BeaconPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
