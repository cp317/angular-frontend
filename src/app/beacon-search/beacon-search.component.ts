import { Component, OnInit } from '@angular/core';
import { Beacon } from '../beacon';
import { WebAPI } from '../web-api.service';

@Component({
  selector: 'app-beacon-search',
  templateUrl: './beacon-search.component.html',
  styleUrls: ['./beacon-search.component.css'],
})

export class BeaconSearchComponent implements OnInit {
  	private webAPI:WebAPI
    beacons:Beacon[] = [];

	schoolName: string = "";
	courseName: string = "";
	timeRemaining: number = 0;
	hasWifi: boolean;
	hasComputers: boolean;
	hasOutlets: boolean;
	hasWhiteboard: boolean;
	hasProjector: boolean;
	tags: string = "00000";
  	
  	//When filter apply is done
  	onApply(){ 
  		//reset tags string
  		this.tags = "";

  		//build the tags string
  		if (this.hasComputers){
  			this.tags += "1";
  		}else{
  			this.tags += "0";
  		}

  		if (this.hasOutlets){
  			this.tags += "1";
  		}else{
  			this.tags += "0";
  		}

  		if (this.hasProjector){
  			this.tags += "1";
  		}else{
  			this.tags += "0";
  		}
  		
  		if (this.hasWhiteboard){
  			this.tags += "1";
  		}else{
  			this.tags += "0";
  		}

  		if (this.hasWifi){
  			this.tags += "1";
  		}else{
  			this.tags += "0";
  		}
  	}

  	//Gets all beacons within filter
  	getFilterBeacons() {
  		this.webAPI.getBeacons(null).then(res => 
  			{
	      	for (var key in res.val()){
	      		var b = res.val()[key];
	        	var s:string[] = [];

	        	//compare to filter
	        	if(((b.course === this.courseName) || (this.courseName === ""))
	        	 && ((b.school === this.schoolName) || (this.schoolName === ""))
	        	 && ((b.tags === this.tags) || (this.tags === "00000"))
	        	 && (this.timeRemaining >= ((b.endTime - b.startTime) / (1000*60*60))) //milliseconds to hours
	        	 ){
	        		this.beacons.push(new Beacon(b.course, b.school, b.startTime, b.endTime, b.host, s, b.tags, b.lat, b.lng, key));
	        	}
	     	}
      //console.log(this.beacons);
    	})
 	 }

  	constructor() { }

  	ngOnInit() {
  	}


}