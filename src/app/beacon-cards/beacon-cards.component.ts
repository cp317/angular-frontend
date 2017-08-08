import { Component, OnInit } from '@angular/core';

import { Beacon } from '../beacon';

import { RegisteredUser } from '../user';

import { WebAPI } from '../web-api.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-beacon-cards',
  templateUrl: './beacon-cards.component.html',
  styleUrls: ['./beacon-cards.component.css'],
})

export class BeaconCardsComponent implements OnInit {
  
  private beacons: Beacon[] = [];

  constructor(private webAPI: WebAPI) { }

  ngOnInit() {
      this.getBeacons();
  }

  getBeacons() {
    this.webAPI.getBeacons(null,null).then(res => {
      this.beacons = res;
    });
  }

  setBeacons(beacons) {
    this.beacons = beacons;
    return;
  }

  joinBeacon(beacon: Beacon) {
    //let curUser: any = this.webAPI.getCurrentUser();
    //curUser.joinBeacon(beacon);
  }

}
