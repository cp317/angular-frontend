import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../web-api.service';
import { BeaconForm } from './beaconCreate.interface';
import { MapComponent } from '../map/map.component';

@Component({
  moduleId: module.id,
  selector: 'app-beacon-create',
  templateUrl: './beacon-create.component.html',
  styleUrls: ['./beacon-create.component.css']
})
export class BeaconCreateComponent implements OnInit {
  public beaconForm: BeaconForm;    // form model
  public submitted: boolean = false;
  private webAPI:WebAPI
  private mapComp:MapComponent

  constructor() { }

  ngOnInit() {

    this.beaconForm = {
      host: {
        firstName:'',
        lastName:''
      },    
      courseCode:'',
      school:'',
      startTime:0,
      endTime:0,   
      lat:0,
      lng:0,
      hasWifi: false,
      hasComputers: false,
      hasOutlets: false,
      hasWhiteboard: false,
      hasProjector: false
    }

  }

  create(form: BeaconForm, isValid: boolean) {
    this.submitted = true;
    // if valid, call API to save customer
    var firstName = form.host.firstName;
    var lastName = form.host.lastName;
    var school = form.school;
    var courseCode = form.courseCode;
    var startDate = new Date(form.startTime);
    var endDate = new Date(form.endTime);
    var startTime = startDate.getTime();
    var endTime = endDate.getTime();

    var tags = [];
    
    if (form.hasComputers) {
      tags.push(1);
    } else{
      tags.push(0);
    }

    if (form.hasOutlets){
      tags.push(1);
    } else{
      tags.push(0);
    }

    if (form.hasProjector){
      tags.push(1);
    } else{
      tags.push(0);
    }

    if (form.hasWhiteboard){
      tags.push(1);
    } else{
      tags.push(0);
    }

    if (form.hasWifi){
      tags.push(1);
    } else{
      tags.push(0);
    }
    console.log(form);
    console.log(tags);
    


  }

  getLocation(){
    var location: {
      lat: number,
      lng: number
    } = this.mapComp.getMapCenter();

    this.beaconForm.lat = location.lat;
    this.beaconForm.lng = location.lng;
    console.log(location);
  }


}
