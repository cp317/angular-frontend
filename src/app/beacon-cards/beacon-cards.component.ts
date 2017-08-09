import { Component, OnInit } from '@angular/core';

import { Beacon } from '../beacon';

import { RegisteredUser } from '../user';

import { WebAPI } from '../web-api.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-beacon-cards',
  templateUrl: './beacon-cards.component.html',
  styleUrls: ['./beacon-cards.component.css'],
})

export class BeaconCardsComponent implements OnInit {
  
  private beacons: any[] = [];
  constructor(private webAPI: WebAPI) { }

  ngOnInit() {
      this.getBeacons();
  }

  getBeacons() {
    var options = {  
    weekday: "short", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"}; 
    this.webAPI.getBeacons(null,null).then(res => {
      this.beacons = res;
      var n = this.beacons.length;
      for (var i = 0; i < n; i++) {
        this.beacons[i].timeUntilActive = new Date(this.beacons[i].startTime).toLocaleTimeString("en-us", options);
        this.beacons[i].timeRemaining = ((this.beacons[i].endTime - this.beacons[i].startTime) / (1000 * 60 *60)).toFixed(1);
        this.beacons[i].index = i;
      }
    });
  }

  setBeacons(beacons) {
    this.beacons = beacons;
  }

  joinBeacon(beacon) {
    var button = <HTMLButtonElement>document.getElementsByName("joinButton")[beacon.index];
    button.setAttribute("disabled","");
    // let curUser: any = this.webAPI.getCurrentUser();
    // curUser.joinBeacon(beacon);
    var leave = <HTMLButtonElement>document.getElementsByName("leaveButton")[beacon.index];
    leave.removeAttribute("disabled");
  }

  leaveBeacon(beacon) {
    var button = <HTMLButtonElement>document.getElementsByName("joinButton")[beacon.index];
    button.removeAttribute("disabled");
    // let curUser: any = this.webAPI.getCurrentUser();
    // curUser.leaveBeacon(beacon);
    var leave = <HTMLButtonElement>document.getElementsByName("leaveButton")[beacon.index];
    leave.setAttribute("disabled","");
  }

}
