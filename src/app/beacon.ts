import * as firebase from 'firebase/app';


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
	
	}
	
	// returns true if the given user is the host, and false otherwise
	// zihua wang
	checkHost(user:registeredUser)
	{
	
	}

  getLat(){
    return this.lat;
  }
}
