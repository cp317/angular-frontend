import { Component, OnInit} from '@angular/core';
import { WebAPI } from '../web-api.service';
import { BeaconForm } from './beaconCreate.interface';


@Component({
  moduleId: module.id,
  selector: 'app-beacon-create',
  templateUrl: './beacon-create.component.html',
  styleUrls: ['./beacon-create.component.css']
})


export class BeaconCreateComponent implements OnInit {
  public beaconForm: BeaconForm;    // form model
  public submitted: boolean = false;
  
  constructor(private webAPI:WebAPI) { 
  }

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
    var location;
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
    
    console.log("running create");
    //console.log(form);
    //console.log(tags);
  }


  isValid(form: BeaconForm)
  {
    var school = form.school;
    var courseCode = form.courseCode;
    var startDate = new Date(form.startTime);
    var endDate = new Date(form.endTime);

    // first check if the dates are defined
    if (typeof(startDate) === "undefined" || typeof(endDate) === "undefined" || startDate == null || endDate == null)
    {
      return "Please enter start and end time in proper format";
    }

    var startTime = startDate.getTime();
    var endTime = endDate.getTime();

    // then check if the dates are valid
    if (startTime > endTime)
    {
      return "End time must be after start time.";
    }
    else if (endTime < new Date().getTime())
    {
      return "End time must be in the future."
    }
    else if (courseCode == null || courseCode.replace(/\s/g, "") == "")
    {
      return "Please enter your course code";
    }
    else if (school == null || school.replace(/\s/g, "") == "")
    {
      return "Please enter your school";
    }
    else
    {
      return true;
    }
  }


  getLocation(){
    var location = this.webAPI.getMapCenter();
    this.beaconForm.lat = location.lat;
    this.beaconForm.lng = location.lng;
    console.log(location);
  }


}
