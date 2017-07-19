import { Component, OnInit } from '@angular/core';

import { WebAPI } from '../web-api.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-amg-map',
  templateUrl: './amg-map.component.html',
  styleUrls: ['./amg-map.component.css']
})

export class AmgMapComponent implements OnInit {

	database = firebase.database();
	beacons:any[] = [];
	user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  location:any = ""

	// google maps zoom level
	zoom: number = 13;

  // initial center position for the map
  lat: number = 0;
  lng: number = 0;

	constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,  private webAPI:WebAPI) {
    
  }

    // display all beacons on the screen
    getBeacons() {
        this.webAPI.getBeacons().then(res => {
        for (var key in res.val()) {
          this.beacons.push(res.val()[key]);
        }
        //console.log(this.beacons);
      });
    }

    getPosition() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
      }
    }

    setPosition(position) {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      //console.log(position.coords);
    }

    ngOnInit() {
      this.getBeacons();
      this.getPosition();
    }

    mapReady($event: any) {
      console.log("Ready");
    }

    placeBeacon($event: any){
    console.log($event.coords.lat);
    console.log($event.coords.lng);
    this.beacons.push({
          lat: $event.coords.lat,
          lng: $event.coords.lng,
          course: "CP317",
          draggable: true
        });
  }
}
