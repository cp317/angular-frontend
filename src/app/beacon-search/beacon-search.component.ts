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
	tags: number[] = [];

  	//When filter apply is done
  	onApply(){
  		//reset tags string
  		this.tags = [];

  		//build the tags string
  		if (this.hasComputers) {
  			this.tags.push(1);
  		} else{
  			this.tags.push(0);
  		}

  		if (this.hasOutlets){
  		  this.tags.push(1);
      } else{
        this.tags.push(0);
      }

  		if (this.hasProjector){
  		  this.tags.push(1);
      } else{
        this.tags.push(0);
      }

  		if (this.hasWhiteboard){
  		  this.tags.push(1);
      } else{
        this.tags.push(0);
      }

  		if (this.hasWifi){
  		  this.tags.push(1);
      } else{
        this.tags.push(0);
      }

  		this.getFilterBeacons();
  	}

		//Gets all beacons within filter
		
  	getFilterBeacons() { /**
  		this.webAPI.getBeacons(this.schoolName, this.courseName).then(res =>
  			{
	      	for (var key in res.val()){
	      		var b = res.val()[key];

	        	//compare to filter
	        	if(((b.tags === this.tags) || (this.tags === [0,0,0,0,0]))
	        	 && (this.timeRemaining >= ((b.endTime - b.startTime) / (1000*60*60))) //milliseconds to hours
	        	 ){
	        		this.beacons.push(new Beacon(key));
	        	}
	     	}
      //console.log(this.beacons);
    	})*/
 	 }

  	constructor() { }

  	ngOnInit() {
  	}


}
