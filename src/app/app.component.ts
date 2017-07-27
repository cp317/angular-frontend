import { Component, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { WebAPI } from './web-api.service';

import { AgmCoreModule } from '@agm/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';

//Class Definitions
import { Beacon } from './beacon';
import {User, RegisteredUser, GuestUser} from './user';


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

   // currentUser can be of the type GuestUser or RegisteredUser
   // to get userId, use currentUser.User.userId
  currentUser:any;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private webAPI:WebAPI) {
    Observable.forkJoin([
      Observable.fromPromise(webAPI.getBeacons()),
      Observable.fromPromise(webAPI.getUserByEmail("MattMurdock96@gmail.com"))
    ]).subscribe(data => {
      this.beacons = data[0];
      this.currentUser = data[1].val();
      console.log(this.currentUser);
      console.log(this.beacons);
    });
    // this.getBeacons();
    this.createGuestUser(); //you are a guest before you are registered
  }

  // display all beacons on the screen
  getBeacons() {
      this.webAPI.getBeacons().then(res =>
      {
        for (var key in res.val())
        {
          var b = res.val()[key];
          var s:string[] = [];
          this.beacons.push(new Beacon(b.course, b.school, b.startTime, b.endTime, b.host, s, b.tags, b.lat, b.lng, key));
        }
        console.log(this.beacons);
      });
  }

  getUser(email){
    this.webAPI.getUserByEmail(email);
  }

	//check if the email is already in use
	// hanx1980@mylaurier.ca
	checkEmail(email:string)
	{

	}

  // get the user with the given email
  login(email:string)
  {
    //this.currentUser = ;
  }

  // logout
  logout()
  {
    this.createGuestUser();
  }

  // create GuestUser
  createGuestUser()
  {
    this.currentUser = new GuestUser();
  }

	// updates references to the guest user to point to the newly registered user
	// zhan5990@mylaurier.ca
	updateUserRef(userId:string, user:RegisteredUser)
	{

	}

  clickedBeacon(label: string, index: number) {
    console.log(`clicked the beacon: ${label || index}`)
  }

  beaconDragEnd(b: Beacon, $event: MouseEvent) {
    console.log('dragEnd', b, $event);
  }
}
