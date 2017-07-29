import * as firebase from 'firebase/app';
import {User, RegisteredUser, GuestUser} from './user';


export class Beacon {
  course:string;
  endTime:number;
  host:string;
  lat:number;
  lng:number;
  members:string[] = [];
	school:string;
  startTime:number;
  tags:string;
  beaconId:string;
  database = firebase.database();

  constructor(course:string, school:string, startTime:number, endTime:number, host:string, members:string[], tags:string, lat:number, lng:number, key:string){
    this.course = course;
    this.school = school;
    this.endTime = endTime;
    this.host = host;
    this.lat = lat;
    this.lng = lng;
    this.startTime = startTime;
    this.tags = tags;

    if (key == null)
    {
      this.storeBeacon(); // inserts into database and generates beaconId
    }
    else
    {
      this.beaconId = key;
    }
  }

  // save the current beacon object to the database
  storeBeacon()
  {
    if (this.beaconId == null)
    {
  		// insert the beacon object into the database
  		this.beaconId = this.database.ref('/beacon/').push({
  			school: this.school,
  			course: this.course,
  			startTime: this.startTime,
  			endTime: this.endTime,
  			host: this.host,
  			tags: this.tags,
  			members: this.members,
  			lat: this.lat,
  			lng: this.lng
  		  }).key;
    }
    else
    {
      // update the existing beacon object into the database
      this.database.ref('/beacon/' + this.beaconId).set({
        school: this.school,
        course: this.course,
        startTime: this.startTime,
        endTime: this.endTime,
        host: this.host,
        tags: this.tags,
        members: this.members,
        lat: this.lat,
        lng: this.lng
        });
    }
	}

	// updates the beacons attributes to match it's values in the database
	// liux6433@mylaurier.ca
	updateBeacon()
	{

	}

		// for every user attending the beacon (plus the host), removes this beacon from their list of beacons
	// hanx1980@mylaurier.ca
	removeBeaconRef()
	{
    var array;
    this.database.ref('/user/').once('value').then( b => {
    var arrtest=this.members;
    for (var m in b.val()){
      for (var n in arrtest){
         if (b.val()[m].userid == arrtest[n]){
             array = b.val()[m].Beacons;
             for (var t in array){
               if (array[t].beaconId == this.beaconId){
                 array.splice(t,1);
               }
             }
         }
      }
    }
    for (var i in b.val()){
      if (b.val()[i].userid == this.host){
        var array = b.val()[i].Beacons;
        for (var a in array){
          if (array[a].beaconId == this.beaconId){
            array.splice(a,1);
          }
        }
      }
    }
   });

	}
	// returns true if the given user is the host, and false otherwise
	// zihua wang
	checkHost(user:RegisteredUser)
	{

	}
	
	// get the beacon ID
	// Rongxin Yuan - 140589620
	getBeaconId(){
		return this.beaconId;
	}
	
	// get the Course code
	// Rongxin Yuan - 140589620
	getCourseCode(){
		return this.course;
	}
	
	// get the Description
	// Rongxin Yuan - 140589620
	getDescription(){
		return this.description;
	}
	// get the Start time
	// Rongxin Yuan - 140589620
	getStartTime(){
		return this.startTime;
	}
	// get the End time
	// Rongxin Yuan - 140589620
	getEndTime(){
		return this.endTime;
	}

  // get the host of the beacon
  // zhan4770@mylaurier.ca
  getHost(){
    return this.host;
  }

  // get the location of the beacon
  // zhan4770@mylaurier.ca
  getLocation(){
    return this.lat + this.lng;
  }

  // get Members 
  // zhan4770@mylaurier.ca

  // get tags
  // zhan4770@mylaurier.ca
  getTags(){
    return this.tags;
  }

  getLat(){
    return this.lat;
  }
}
