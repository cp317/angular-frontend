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
      Observable.fromPromise(webAPI.getBeacons(null,null)),
      Observable.fromPromise(webAPI.getUserByEmail("MattMurdock96@gmail.com"))
    ]).subscribe(data => {
      this.beacons = data[0];
    });

    this.currentUser = new GuestUser(null); //you are a guest before you are registered
  }

  // display all beacons on the screen
  getBeacons() {
      this.webAPI.getBeacons(null,null).then(res =>
      {
        for (var key in res)
        {
          this.beacons.push(new Beacon(key));
        }
      });
  }

  getUser(email){
    this.webAPI.getUserByEmail(email);
  }


  /**
 @ Purpose: Sample test for checkEmail fucntion.
 @ flag:    The result will be true, if the email already exists
           and flag will be false if the email does not exist.

  function main(){
  var email = prompt("enter email: ");
  checkEmail(email,function(flag){
    alert(flag);
  });
}

  **/

	//check if the email is already in use
	// hanx1980@mylaurier.ca
	checkEmail(email:string,callback)
	{
    var flag:Boolean = false;
    this.database.ref('/user/').once('value').then(res =>
      {
        for (var key in res.val())
        {
          var b = res.val()[key];
          if (b.email==email){
            flag = true;
          }
        }
        callback(flag);
      });
	}


  // get the user with the given email
  login(email:string)
  {
    //this.currentUser = ;
  }

  // logout
  logout()
  {
    // replace the current user object with a new guest user
    this.currentUser = new GuestUser(null);
  }

	// updates references to the guest user to point to the newly registered user
	// zhan5990@mylaurier.ca
	updateUserRef(userId:string, user:RegisteredUser)
	{
    this.database.ref('/beacon/').once('value').then(b =>
    {
      for(var i in b.val()){
        if(b.val()[i].host.userId == userId){
          b.val()[i].host = user;
         }
      }
      for (var m in b.val()){
        var array = b.val()[m].members;
        for (var n in array){
          if (array[n].userId == userId){
            array[n] = user;
          }
        }
      }
    });
	}

  clickedBeacon(label: string, index: number) {
    console.log(`clicked the beacon: ${label || index}`)
  }

  beaconDragEnd(b: Beacon, $event: MouseEvent) {
    console.log('dragEnd', b, $event);
  }
}
