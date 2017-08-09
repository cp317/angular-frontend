import { Component } from '@angular/core';
import { Beacon } from '../beacon';
import { WebAPI } from '../web-api.service';
import { MapComponent } from '../map/map.component'
import { BeaconCardsComponent } from '../beacon-cards/beacon-cards.component'

@Component({
  selector: 'app-beacon-search',
  templateUrl: './beacon-search.component.html',
  styleUrls: ['./beacon-search.component.css'],
})


export class BeaconSearchComponent {

  constructor(
  private webAPI: WebAPI,
  private map: MapComponent,
  private cards: BeaconCardsComponent
  ) { }

  beacons: Beacon[] = [];

	schoolName: string;
	courseName: string;
	timeRemaining: number = 6;
	hasWifi: boolean;
	hasComputers: boolean;
	hasOutlets: boolean;
	hasWhiteboard: boolean;
	hasProjector: boolean;
	tags: number[];

	apply() {
		//reset tags string
		this.tags = [];
    this.beacons = [];

		//build the tags string
		if (this.hasComputers)
			this.tags.push(1);
		else
			this.tags.push(0);
		

		if (this.hasOutlets) 
		  this.tags.push(1);
    else
      this.tags.push(0);
    

		if (this.hasProjector)
		  this.tags.push(1);
    else
      this.tags.push(0);
    

		if (this.hasWhiteboard)
		  this.tags.push(1);
    else
      this.tags.push(0);
    

		if (this.hasWifi)
		  this.tags.push(1);
    else
      this.tags.push(0);

    this.schoolName = (<HTMLInputElement> document.getElementsByName('schoolFilter')[0]).value;
    this.courseName = (<HTMLInputElement> document.getElementsByName('courseFilter')[0]).value;
    this.timeRemaining = +(<HTMLInputElement> document.getElementsByName('timeRemaining')[0]).value;

		this.getFilterBeacons();
	}
		
	getFilterBeacons() {
		this.webAPI.getBeacons(this.schoolName, this.courseName).then(res => {
      	for (var key in res) {
          var b = res[key];
          if (this.timeRemaining >= ((b.endTime - b.startTime) / (1000 * 60 * 60))) {
            var t = 1;
            for (var i = 0; i < this.tags.length; i++) {
              if (this.tags[i] > b.tags[i])
                t = 0;
            }
            if (t == 1)
              this.beacons.push(b);
          }
     	}
       // console.log(this.beacons);
       this.map.setBeacons(this.beacons);
       this.cards.setBeacons(this.beacons);
  	})
	}

  disable() {
    var button = <HTMLButtonElement> document.getElementsByName("applyButton")[0];
    button.setAttribute("disabled","");
  }

  enable() {
    var button = <HTMLButtonElement> document.getElementsByName("applyButton")[0];
    button.removeAttribute("disabled");
  }

}
