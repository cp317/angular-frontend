import { Component, OnInit } from '@angular/core';

import { WebAPI } from '../web-api.service';
import { Beacon } from '../beacon';

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
  position:any = "";

	// google maps zoom level
	zoom: number = 6;

  // initial center position for the map
  lat: number = 0;
  lng: number = 0;

	constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,  private webAPI:WebAPI) { }

      ngOnInit() {
      // gets beacons from firebase
      this.getBeacons();
      // sets initial map position based on user location
      this.getPosition();
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

    // gets the position of user from their browser and calls setPostion()
    getPosition() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
      }
    }

    // sets the maps lat and lng attributes given a position
    setPosition(position) {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      //console.log(position.coords);
    }

    // returns the maps current center latitude and longitude
    getMapCenter() {
      //console.log(this.lat);
      //console.log(this.lng);
      return this.lat, this.lng;
    }

    // logs when the map has loaded
    mapReady($event: any) {
      console.log("Ready");
    }

    // places a beacon given an amg-map mapClick $event
    placeBeacon($event: any) {
      console.log($event.coords.lat);
      console.log($event.coords.lng);
  }
}
