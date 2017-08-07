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

	schoolName: string;
	courseName: string;
	timeRemaining: number;
	hasWifi: boolean;
	hasComputers: boolean;
	hasOutlets: boolean;
	hasWhiteboard: boolean;
	hasProjector: boolean;
	tags: number[];

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
  console.log(this.schoolName);
		this.webAPI.getBeacons(this.schoolName, this.courseName).then(res => {
       console.log("here1");
      	for (var key in res) {
          console.log("here2");
          var b = res[key];
          console.log(b);
          console.log(b.tags);
          console.log(this.timeRemaining);
          console.log(b.endTime);
          console.log(b.startTime);
          console.log(((b.endTime - b.startTime) / (1000 * 60 * 60)));
          if (this.timeRemaining >= ((b.endTime - b.startTime) / (1000 * 60 * 60))) {
            console.log("here3");
            var t = 1;
            for (var i = 0; i < this.tags.length; i++) 
            {
              console.log(this.tags[i]);
              if (b.tags[i] > this.tags[i])
              {
                t = 0;
              }
            }
            if (t == 1)
            {
              this.beacons.push(b);
            }
          }
     	}
      console.log(this.beacons);
  	})
	}
}
