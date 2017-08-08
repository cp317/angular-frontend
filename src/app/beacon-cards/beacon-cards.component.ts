import { Component, OnInit, NgZone} from '@angular/core';

import { Beacon } from '../beacon';

import { RegisteredUser } from '../user';

import { WebAPI } from '../web-api.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

declare let componentHandler: any;
@Component({
  selector: 'app-beacon-cards',
  templateUrl: './beacon-cards.component.html',
  styleUrls: ['./beacon-cards.component.css'],
})

export class BeaconCardsComponent implements OnInit {
  
  private beacons: Beacon[] = [];
  constructor(private webAPI: WebAPI,private zone:NgZone
              ) { }

  ngOnInit() {
      this.getBeacons();
  }
  ngAfterViewInit() {
  }
  getBeacons() {
    this.webAPI.getBeacons(null,null).then(res => {
      this.beacons = res;
    });
  }

  setBeacons(beacons) {
    this.beacons = beacons;
    this.zone.run(() => {
            console.log('forced a refresh');
        });
  }

  joinBeacon(beacon: Beacon) {
    //let curUser: any = this.webAPI.getCurrentUser();
    //curUser.joinBeacon(beacon);
  }
  trackBeacon(index: number, beacon: Beacon) {
    return index;
  }


}
