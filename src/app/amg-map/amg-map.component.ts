import { ElementRef, NgZone, ViewChild, Component, OnInit } from '@angular/core';
import { WebAPI } from '../web-api.service';
import { Beacon } from '../beacon';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

import { FormControl } from '@angular/forms';

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

	private database = firebase.database();
	private beacons:any[] = [];
	private user: Observable<firebase.User>;
  private items: FirebaseListObservable<any[]>;
  private position: any;
  public searchControl: FormControl;

	// google maps zoom level
	private zoom: number = 6;
  // initial center position for the map
  private lat: number = 0;
  private lng: number = 0;

  @ViewChild("search")
  public searchElementRef: ElementRef;

	constructor(
    private afAuth: AngularFireAuth, 
    private af: AngularFireDatabase,  
    private webAPI:WebAPI,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {

    //create a random new Beacon for testing purposes
    // this.createBeacon("CP317", "Laurier",
    //     new Date().getTime(),
    //     new Date().getTime() + 1 +  Math.floor(Math.random() * 21600000),
    //     "123456789ABCDEFG",
    //     43.4724 + (Math.random()-0.5),
    //     -80.526 + (Math.random()-0.5),
    //     "0010");
    // gets beacons from firebase
    this.getBeacons();
    // sets initial map position based on user location
    this.getPosition();
    // creates serach FromControl
    this.searchControl = new FormControl()

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
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

  // create a new Beacon, which is first instantiated as a class and then stored in the database
  createBeacon(
    course:string, 
    school:string, 
    startTime:number, 
    endTime:number, 
    host:string, 
    lat:number, 
    lng:number, 
    tags:string)
  {
    var b = new Beacon({
      school: school,
      course: course,
      startTime: startTime,
      endTime: endTime,
      host: host,
      lat: lat,
      lng: lng,
      tags: tags});
    console.log(b);
    b.storeBeacon();
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
