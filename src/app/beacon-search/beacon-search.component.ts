import { Component, OnInit } from '@angular/core';
import { Beacon } from '../beacon';
import { WebAPI } from '../web-api.service';

@Component({
  selector: 'app-beacon-search',
  templateUrl: './beacon-search.component.html',
  styleUrls: ['./beacon-search.component.css'],
})

export class BeaconSearchComponent {

  constructor(
  private webAPI:WebAPI
  ) { }

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

	onApply() {
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

    this.schoolName = (<HTMLInputElement> document.getElementsByName('schoolFilter')[0]).value;
    this.courseName = (<HTMLInputElement> document.getElementsByName('courseFilter')[0]).value;
    this.timeRemaining = +(<HTMLInputElement> document.getElementsByName('timeRemaining')[0]).value;

		this.getFilterBeacons();
	}
		
  	getFilterBeacons() {
      console.log(this.tags);
      console.log(this.schoolName);
      console.log(this.courseName);
  		this.webAPI.getBeacons(this.schoolName, this.courseName).then(res =>
  			{
	      	for (var key in res) {
            var b = new Beacon(key);
	        	//compare to filter
	        	if (b.tags === this.tags && this.timeRemaining >= ((b.endTime - b.startTime) / (1000 * 60 * 60))) {
              console.log("passes filter");
              console.log(b);
	        		this.beacons.push(b);
	        	}
	     	}
        console.log(this.beacons);
    	})
 	 }
}
