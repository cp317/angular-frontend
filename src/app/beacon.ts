export class Beacon {
  course:string;
  endTime:number;
  host:string;
  lat:number;
  lng:number;
  members:string[];
	school:string;
  startTime:number;
  tags:string;

  constructor(b:any){
    this.course = b.course;
    this.endTime = b.endTime;
    this.host = b.host;
    this.lat = b.lat;
    this.lng = b.lng;
    this.members = b.members;
    this.startTime = b.startTime;
    this.tags = b.tags;
  }
	
	constructor(school:string, course:string, host:string, startTime:number, endTime:number, tags:string, lat:number, lng:number)
	{
		// set the given attributes to the beacon class instance
		this.course = course;
    this.endTime = endTime;
    this.host = host;
    this.lat = lat;
    this.lng = lng;
    this.members = members;
    this.startTime = startTime;
    this.tags = tags;
		
		// insert the database object into the database
		database.ref('/beacon/').push({
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
