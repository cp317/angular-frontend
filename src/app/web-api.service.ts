import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class WebAPI {
  database = firebase.database();

  constructor() { }

  getBeacons(): firebase.Promise<any>{
    return new Promise((resolve,reject) => {
      this.database.ref('/beacon/').once('value').then( res => {
        var beacons = [];
        for (let key in res.val()){
          beacons.push(res.val()[key])
        }
        resolve(beacons);
      });
    }).catch(err => console.log(err))
  }

  getUserById(id:string){

  }

  getUserByEmail(email:string):Promise<any>{
    return new Promise((resolve,reject) => {
      this.database.ref("user").orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
        resolve(snapshot);
      });
    }).catch(err => console.log(err))
  }
}
