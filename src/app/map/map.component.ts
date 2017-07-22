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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

	private database = firebase.database();
	private user: Observable<firebase.User>;
  private items: FirebaseListObservable<any[]>;
  private searchControl: FormControl;
  private beacons:any[] = [];
  private address: string;

	// google maps zoom level
	private zoom: number = 8;
  // initial center position for the map if location denied
  private lat: number = 13.7244418;
  private lng: number = 100.3522238;
  // create reference for the search input bar
  @ViewChild("search")
  private searchElementRef: ElementRef;

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
    this.getPosition()

    // creates serach FromControl
    this.searchControl = new FormControl()

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // attach Autocomplete to input box using ElementRef
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // select type of google filter from ["geocode", "address", "establishment"]
        types: ["geocode"]
      });
      // add listener to the autocomplete text field
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom based on autocomplete suggestion
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 10;
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
    //console.log(b);
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
    // console.log(this.lat);
    // console.log(this.lng);
    this.reverseGeocode();
  }

  // if user allows location, display current address in autocomplete search bar
  reverseGeocode() {
    // create new geocoder
    var geocoder = new google.maps.Geocoder();
    // get users {lat, lng}
    var latlng = this.getMapCenter();
    // console.log(latlng);
    // get address from geocoder based on {lat, lng}
    var address = geocoder.geocode({'location': latlng}, function(results, status) {
        // console.log(results[1].formatted_address);
        this.address = results[1].formatted_address;
        // update search bar placeholder
        document.getElementsByName('search')[0].setAttribute('placeholder', this.address);
    })
  }

  // returns the maps current center latitude and longitude
  getMapCenter() {
    //console.log(this.lat);
    //console.log(this.lng);
    return {lat: this.lat, lng: this.lng};
  }

  // logs when the map has loaded
  mapReady($event: any) {
    console.log("Ready");
  }

  // logs a beacon lat, lng given (for future functionality)
  placeBeacon($event: any) {
    console.log($event.coords.lat);
    console.log($event.coords.lng);
  }

  // logs each beacon click (for future functionality)
  clickedBeacon(beacon: Beacon, index: number) {
    console.log(`clicked the beacon: ${beacon.course || index}`)
  }
}
