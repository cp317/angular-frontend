import * as firebase from 'firebase/app';
import { User, RegisteredUser, GuestUser } from './user';
import { WebAPI } from './web-api.service';
import { Chat } from './chat';

export class Beacon {
  course:string;
  endTime:number;
  chat:Chat;
  host:any;
  lat:number;
  lng:number;
  members:any[] = [];
  school:string;
  startTime:number;
  tags: number[] = [];
  beaconId:string;
  description:string;
  webAPI:WebAPI = new WebAPI();
  database = firebase.database();
  

  constructor(key:string){
	
    if (key == null)
    {
      this.storeBeacon(); // inserts into database and generates beaconId
    }
    else
    {
      this.beaconId = key;
    }
	
	
    this.updateBeacon();
  }
 
  // save the current beacon object to the database
  storeBeacon()
  {
		var membersId = [];

		for (var i in this.members)
		{
			membersId.push(this.members[i].user.userId);
		}

    if (this.beaconId == null)
    {
  		// insert the beacon object into the database
  		this.beaconId = this.database.ref('/beacon/').push({
  			school: this.school,
  			course: this.course,
  			startTime: this.startTime,
  			endTime: this.endTime,
  			host: this.host.user.userId,
  			tags: this.tags,
  			members: membersId,
        description: this.description,
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
        host: this.host.user.userId,
        tags: this.tags,
        members: membersId,
        description: this.description,
        lat: this.lat,
        lng: this.lng
        });
    }
	}

	// updates the beacons attributes to match it's values in the database
	updateBeacon()
	{
	  this.database.ref('/beacon/' + this.beaconId).once('value').then(res => {
      var beacon = res.val();
		this.course = beacon.course,
		this.endTime = beacon.endTime,
		this.lat = beacon.lat,
		this.lng = beacon.lng,
		this.school = beacon.school,
		this.startTime = beacon.startTime,
		this.tags = beacon.tags,
		this.description = beacon.description
    this.webAPI.getUserById(beacon.host).then(h => {
      this.host = h;
    });

    for (var i in beacon.members)
    {
      this.webAPI.getUserById(beacon.members[i]).then(m => {
        this.members[i] = m;
      });
    }
  });


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
         if (b.val()[m].userid == arrtest[n].userid){
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
      if (b.val()[i].userid == this.host.userid){
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
	checkHost(user:RegisteredUser,callback)
	{
    var flag:boolean;
		this.database.ref('users').once('value').then(ref =>
		{
			for (var i in ref.val()){
				if (ref.val()[i].host == user.user.userId){
					flag = true;
				}else{
					flag = false;
				}
			}
			callback(flag);

		});

	}

	// get the beacon ID
	getBeaconId()
  {
		return this.beaconId;
	}

	// get the Course code
	getCourseCode(){
		return this.course;
	}

	// get the Description
	getDescription(){
		return this.description;
	}

	// get the Start time
	getStartTime(){
		return this.startTime;
	}

	// get the End time
	getEndTime(){
		return this.endTime;
	}

	// add user to members
	addUser(newUser){
		this.members.push(newUser);
	}

	// remove users
	removeUser(user){
		var index = this.members.indexOf(user);
    if (index != -1)
    {
		    this.members.splice(index, 1);
    }
	}

  // get the host of the beacon
  getHost(){
    return this.host;
  }

  // get the location of the beacon
  getLocation(){
    return [this.lat, this.lng];
  }

  // get members
  getMembers(){
    return this.members;
  }

  // get tags
  getTags(){
    return this.tags;
  }

  // set the location
  setLocation(lat:number, lng:number){
    this.lat = lat;
    this.lng = lng;
    this.storeBeacon();
  }

  // set the start time
  setStartTime(startTime:number){
    this.startTime = startTime;
    this.storeBeacon();
  }

  // set end time
  setEndTime(endTime:number){
    this.endTime = endTime;
    this.storeBeacon();
  }

  // set tags
  setTags(tags:number[]){
    this.tags = tags;
    this.storeBeacon();
  }

  getLat(){
    return this.lat;
  }
}
