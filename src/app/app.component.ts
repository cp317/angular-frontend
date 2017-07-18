import { Component, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { WebAPI } from './web-api.service';

import { AgmCoreModule } from '@agm/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

//Class Definitions
import { Beacon } from './beacon';


@Component({
  selector: 'app-root',
  templateUrl:'app.component.html'
})
export class AppComponent {

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  database = firebase.database();
  beacons:Beacon[] = [];
  title: string = "Study Group Finder";

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private webAPI:WebAPI) {
    this.getBeacons();
  }

  // display all beacons on the screen
  getBeacons() {
      this.webAPI.getBeacons().then(res => {
      for (var key in res.val()) {
        this.beacons.push(new Beacon(res.val()[key]));
      }
      console.log(this.beacons[0].getLat());
    });
  }

  clickedBeacon(label: string, index: number) {
    console.log(`clicked the beacon: ${label || index}`)
  }

  beaconDragEnd(b: Beacon, $event: MouseEvent) {
    console.log('dragEnd', b, $event);
  }
}
