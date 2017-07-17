import { Component, OnInit } from '@angular/core';

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
	
	// google maps zoom level
	zoom: number = 13;

    // initial center position for the map
    lat: number = 43.4724;
    lng: number = -80.5263;
    
	constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
		this.beacons = this.displayBeacon();
		console.log(this.beacons);
  }

    // display all beacons on the screen
    displayBeacon() {
		var beacons = [];
		// get all the beacons from the database
		this.database.ref('/beacon/').once('value').then(function(b) {
			// return b.val();
			for (var i in b.val())
  		{
        beacons.push(b.val()[i]);
      }
  	});
    return beacons;
  }

    ngOnInit() {
    }
  
    // mapClicked($event: MouseEvent) {
  //   this.beacons.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     course: "CP317",
  //     draggable: true
  //   });
  // }
}
