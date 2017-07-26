import { Component, OnInit } from '@angular/core';

import { Beacon } from '../beacon';

import { WebAPI } from '../web-api.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-beacon-cards',
  templateUrl: './beacon-cards.component.html',
  styleUrls: ['./beacon-cards.component.css']
})
export class BeaconCardsComponent implements OnInit {
    
    beacons: Array<Beacon>;
    beacon: Beacon;
    
    getBeacons() {
      this.webAPI.getBeacons().then(res => {
      for (var key in res.val())
      {
        var b = res.val()[key];
        var s:string[] = [];
        this.beacons.push(new Beacon(b.course, b.school, b.startTime, b.endTime, b.host, s, b.tags, b.lat, b.lng, key));
      }
      //console.log(this.beacons);
    });
  }

    constructor(
        private afAuth: AngularFireAuth,
        private af: AngularFireDatabase,
        private webAPI:WebAPI,) { }

    ngOnInit() {
        this.getBeacons()
        
        this.beacon = this.beacons[0] // gets the first beacon
    }

}
