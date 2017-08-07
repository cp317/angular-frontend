import { Component, OnInit} from '@angular/core';
import { WebAPI } from '../web-api.service';
import { BeaconForm } from './beacon-create.interface';


@Component({
  moduleId: module.id,
  selector: 'app-beacon-create',
  templateUrl: './beacon-create.component.html',
  styleUrls: ['./beacon-create.component.css']
})


export class BeaconCreateComponent implements OnInit {
  public beaconForm: BeaconForm;    // form model
  public submitted: boolean = false;
  private desc: string; 

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
      startTime:null,
      endTime:null,   
      lat:null,
      lng:null,
      description:'',
      hasWifi: false,
      hasComputers: false,
      hasOutlets: false,
      hasWhiteboard: false,
      hasProjector: false
    }
    this.submitted = false;
  }

  create(form: BeaconForm) {

    var valid = this.isValid(form);

    if (valid == true) {    
      this.submitted = true;
      var firstName = form.host.firstName;
      var lastName = form.host.lastName;
      var hostName = firstName + " " + lastName;

      var startDate = new Date(form.startTime);
      var endDate = new Date(form.endTime);
      var startTime = startDate.getTime();
      var endTime = endDate.getTime();
      var members = [];
      var tags = [];
      form.description = this.desc;
      
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

      this.webAPI.createBeacon(form.courseCode, form.school, startTime, endTime, hostName, members, tags, form.description, form.lat, form.lng);
      alert("Beacon created.")
      this.desc='';
      this.ngOnInit();
    }
    else {
      alert(valid);
    }

  }


  isValid(form: BeaconForm)
  {
    var school = form.school;
    var courseCode = form.courseCode;
    var lat = form.lat;
    var lng = form.lng;
    var startDate = new Date(form.startTime);
    var endDate = new Date(form.endTime);

    // first check if the dates are defined
    if ( form.startTime == null || form.endTime == null)
    {
      return "Please enter a start and end time.";
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
      return "Please enter your course code.";
    }
    else if (school == null || school.replace(/\s/g, "") == "")
    {
      return "Please enter your school.";
    }
    else if ( lat == null || lng == null){
      return "Please enter valid latitude and longitude values or click the 'Get Center Location From Map' button."
    }
    else
    {
      return true;
    }
  }

  /** sets the location of the center of map on create-beacon form */
  getLocation(){
    var location = this.webAPI.getMapCenter();
    this.beaconForm.lat = location.lat;
    this.beaconForm.lng = location.lng;
  }


}
