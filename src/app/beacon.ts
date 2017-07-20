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
  database = firebase.database();

  constructor(b:any){
    this.course = b.course;
    this.school = b.school;
    this.endTime = b.endTime;
    this.host = b.host;
    this.lat = b.lat;
    this.lng = b.lng;
    if (b.members != null)
    {
    this.members = b.members;
    }
    this.startTime = b.startTime;
    this.tags = b.tags;
  }

  storeBeacon()
  {
		// insert the beacon object into the database
		this.database.ref('/beacon/').push({
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

  getLat(){
    return this.lat;
  }
}
