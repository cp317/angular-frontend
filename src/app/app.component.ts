import { Component, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AgmCoreModule } from '@agm/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  styles: [`
    .sebm-google-map-container {
      height: 400px;
      width: 100%;
      float: right;
     }
  `],
  templateUrl:'app.component.html'
})
export class AppComponent {

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';
  database = firebase.database();
  beacons:any[] = [];

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.beacons = this.displayBeacon();
    console.log(this.beacons);
  }


  // display all beacons on the screen
  displayBeacon()
  {
    var bacons = [];
  	// get all the beacons from the database
  	this.database.ref('/beacon/').once('value').then(function(b)
  	{
  		// return b.val();
  		for (var i in b.val())
  		{
        bacons.push(b.val()[i]);
      }
  	});
    return bacons;
  }

  // google maps zoom level
  zoom: number = 13;

  // initial center position for the map
  lat: number = 43.4724;
  lng: number = -80.5263;

  clickedBeacon(label: string, index: number) {
    console.log(`clicked the beacon: ${label || index}`)
  }

  // mapClicked($event: MouseEvent) {
  //   this.beacons.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     course: "CP317",
  //     draggable: true
  //   });
  // }

  beaconDragEnd(b: beacon, $event: MouseEvent) {
    console.log('dragEnd', b, $event);
  }

//   beacons: beacon[] = [
// 	  {
// 		  lat: 43.4724,
// 		  lng: -80.526,
// 		  course: "NULL",
// 		  draggable: false
// 	  },
// 	  {
// 		  lat: 43.4750,
// 		  lng: -80.526,
// 		  course: "NULL",
// 		  draggable: false
// 	  },
//   ]
}
// just an interface for type safety.
interface beacon {
	lat: number;
	lng: number;
	id?: string;
	course: string;
	draggable: boolean;
}

@NgModule({
  imports: [ BrowserModule, AgmCoreModule.forRoot() ],
  declarations: [ Map ],
  bootstrap: [ Map ]
})
export class MapModule {}
