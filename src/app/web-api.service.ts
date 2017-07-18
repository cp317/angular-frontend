import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class WebAPI {
  database = firebase.database();
  
  constructor() { }

  getBeacons(): firebase.Promise<any>{
  	var promise = this.database.ref('/beacon/').once('value').then( res => {
      return res;
  	// get all the beacons from the database
  	});
  	return promise;
  }
}
