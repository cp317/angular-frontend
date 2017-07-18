export class Beacon {
  course:string;
  endTime:number;
  host:string;
  lat:number;
  lng:number;
  members:string[];
  startTime:number;
  tags:string;

  getLat(){
    return this.lat;
  }
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
}
