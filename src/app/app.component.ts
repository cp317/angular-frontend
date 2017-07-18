import { Component, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { WebAPI } from './web-api.service';

import { AgmCoreModule } from '@agm/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl:'app.component.html'
})
export class AppComponent {

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  database = firebase.database();
  beacons:any[] = [];
  title: string = "Study Group Finder";

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private webAPI:WebAPI) {
    this.webAPI.getBeacons().then(res => {
      for (var i in res.val()) {
        this.beacons.push(res.val()[i]);
      }
      //console.log(this.beacons);
    });
  }


  clickedBeacon(label: string, index: number) {
    console.log(`clicked the beacon: ${label || index}`)
  }

  beaconDragEnd(b: beacon, $event: MouseEvent) {
    console.log('dragEnd', b, $event);
  }
}

// just an interface for type safety.
interface beacon {
	lat: number;
	lng: number;
	id?: string;
	course: string;
	draggable: boolean;
}
