import { Component, OnInit } from '@angular/core';
import { Beacon } from '../beacon';

@Component({
  selector: 'app-beacon-search',
  templateUrl: './beacon-search.component.html',
  styleUrls: ['./beacon-search.component.css'],
})

export class BeaconSearchComponent implements OnInit {
	schoolName: string = "";
	courseName: string = "";
	startTime: number;
	endTime: number;
	timeRemaining: number = 0;
	hasWifi: boolean;
	hasComputers: boolean;
	hasOutlets: boolean;
	hasWhiteboard: boolean;
	hasProjector: boolean;
	tags: string = "";

	//for testing
  	//clickMessage = "";
  	
  	onApply(){ 
  		//this.clickMessage = this.schoolName + " " + this.courseName + " ";
  		this.tags = "";

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

  	//function for checking the filters and then sorting the array of beacons
  	//then send that to display

  	//do by first making empty beacon array
  	//then get an array of beacons from the database
  	//ompare each beacon in the array with the properties listed above
  	//put matching in array
  	//send array to display


  	constructor() { }

  	ngOnInit() {
  	}


}