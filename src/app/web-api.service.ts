import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {User, RegisteredUser, GuestUser} from './user';


@Injectable()
export class WebAPI {
  database = firebase.database();
  
  lat:number = 13.7244418;
  lng:number = 100.3522238;
  address:string;

  constructor() { }

  // gets all beacons with the given school and course
  // if school is null, return beacons with any school
  // if course is null, return beacons with any course
  getBeacons(school:string, course:string): firebase.Promise<any>
  {
    return new Promise((resolve,reject) =>
    {
      this.database.ref('/beacon/').once('value').then( res =>
      {
        var beacons = {};
        var validSchoolNames = [];
        if (school != null && school != "")
        {
          validSchoolNames.push(school.toUpperCase());

          // get any names that are a substring of the given school name
          // or that the school name is a substring of
          var schoolNames = this.getSchoolNameSubstr(res.val(),school)
          for (let name of schoolNames)
          {
            if (!validSchoolNames.includes(name.toUpperCase()))
            {
              validSchoolNames.push(name.toUpperCase());
            }
          }
          // get any acronyms of the school name
          for (let name of validSchoolNames)
          {
            schoolNames = this.get_name_acr(res.val(), name);
            for (let name_acr of schoolNames)
            {
              if(!validSchoolNames.includes(name_acr.toUpperCase()))
              {
                validSchoolNames.push(name_acr.toUpperCase());

                if (name_acr.length > school.length)
                {
                  // orignal school name was an acronym so get school names of the full version
                  var schoolNames = this.getSchoolNameSubstr(res.val(),name_acr)
                  for (let name of schoolNames)
                  {
                    if (!validSchoolNames.includes(name.toUpperCase()))
                    {
                      validSchoolNames.push(name.toUpperCase());
                    }
                  }
                }
              }
            }
          }
          for (let name of validSchoolNames)
          {
            if(name.length > 3)
            {
              schoolNames = this.get_name_spl(name, 1, res.val());
              for (let s of schoolNames)
              {
                if (!validSchoolNames.includes(s.toUpperCase()))
                {
                  validSchoolNames.push(s.toUpperCase());
                }
              }
            }
          }

        }
        if (school != null && school != "")
        {
          //console.log(validSchoolNames);
          for (let key in res.val())
          {
            if (validSchoolNames.includes(res.val()[key].school.toUpperCase()))
            {
              beacons[key] = res.val()[key];
            }
          }
        }
        else
        {
          for (let key in res.val()){
            beacons[key] = res.val()[key];
          }
        }
        if (course != null && course != "")
        {
          for (let key in beacons)
          {
            if (beacons[key].course.replace(/\s/g, "").toUpperCase() != course.replace(/\s/g, "").toUpperCase())
            {
              delete beacons[key];
            }
          }
        }
        //console.log(beacons);
        beacons = this.beaconSort(beacons);
        resolve(beacons);
      });
    }).catch(err => console.log(err))
  }

  beaconSort(beacons)
  {
    var beaconArray = [];

    for (var i in beacons)
    {
      beacons[i].distance = Math.sqrt(Math.pow(111 * Math.abs(this.lat - beacons[i].lat),2) + Math.pow(111 * Math.abs(this.lng - beacons[i].lng) * Math.cos(this.lat * Math.PI / 180),2));

      beacons[i].distance = Math.round(beacons[i].distance * 10) / 10;
      if (beacons[i].distance >= 10)
      {
        beacons[i].distance = Math.round(beacons[i].distance);
      }

      var n = beaconArray.length;
      var j = 0;

      while (j < n && beaconArray[j].distance < beacons[i].distance)
      {
        j++
      }

      if (j == n)
      {
        beaconArray.push(beacons[i]);
      }
      else
      {
        beaconArray.splice(j, 0, beacons[i]);
      }
      
    }
    console.log(beacons);
    console.log(beaconArray);

    return beaconArray;

  }

  // function 1: get any school name that contains the given school name or is contained within the given school name
  // ex. ("Laurier" == "wilfrid laurier university")
  getSchoolNameSubstr(beacons, school_name)
  {
    var uppcase=school_name.toUpperCase();                                          // make the parameter uppercase and its called uppcase
    var len=uppcase.length;
    var camp;
    var t =[];
    var temp;
    var flag = false;
    //alert('agg');
    if (uppcase !='UNIVERSITY' && uppcase != 'OF'){                                 // make sure when the user input university and of, it return nothing.
      for(var i in beacons){
        if (beacons[i].school != undefined){
          camp=beacons[i].school.toUpperCase();                                // making the string to uppercase
          if (camp==uppcase){
            flag= true;
          }
          temp=camp.split(' ');                                                // splitting the string
          for (var tx in temp){
            if (temp[tx].toUpperCase()==uppcase){                            // comparing the string
              flag = true;
            }
          }
          if (flag == true){                                                     // if string contains the given school name, then this string will be pushed into array.
            t.push(beacons[i].school);
            flag = false;
          }
        }
      }
      var ua = uppcase.split(" ");
      for (var m in beacons)
      {
        for (var n in ua)
        {
          if (beacons[m].school != undefined && beacons[m].school.toUpperCase() == ua[n])
          {
              t.push(beacons[m].school);
          }
        }
      }
    }
      return t;
  }


get_name_acr(beacons:any[], school_name:string)
{
	var all_schools = [];
	//check whether the school_name contains 'of'
	var new_name = "";
	var split_name = school_name.split("OF");
	for (var i in split_name){
		new_name += split_name[i];
	}

	//search without 'of'
	if(school_name != new_name)
	{
		var s = this.get_name_acr_aux(beacons, new_name);
		for (var i in s)
		{
			all_schools.push(s[i]);
		}
	}

	// search with the original name
	var s = this.get_name_acr_aux(beacons, new_name);
	for (var i in s)
	{
		all_schools.push(s[i]);
	}
  return all_schools;
}

get_name_acr_aux(beacons:any[], school_name:string)
{
	var schools = [];

		// iterate through each beacon
		for (var i in beacons)
		{
			//schools may be undefined in database
			if (beacons[i].school != undefined)
			{
				var acr_names = this.get_acr(beacons[i].school);
				for (var j in acr_names)
				{
					if(acr_names[j] == school_name)
					{
						schools.push(beacons[i].school);
					}
				}
        acr_names = this.get_acr(school_name);
        for (var j in acr_names)
				{
					if(acr_names[j] == beacons[i].school)
					{
						schools.push(beacons[i].school);
					}
				}
			}
		}
	return schools;
}

// the function returns an array of acronyms
get_acr(school_name:string)
{
	//init the array
	var acr_names = [];
	var split_name = school_name.split(" ");
	var acr = "";
	var flag = false;

	//push the acronym to acr_names and check whether the name contains 'of' or not
	for (var i in split_name)
  {
		acr += split_name[i][0]
		if(split_name[i].toUpperCase() == "OF"){
			flag = true;
		}
	}

	acr_names.push(acr.toUpperCase());
	acr = "";

	//push the new acronym without 'of', if the flag is set to true
	if(flag)
  {
		for (var i in split_name){
			if(split_name[i].toUpperCase() != "OF"){
				acr += split_name[i][0]
			}
		}
		acr_names.push(acr.toUpperCase());
	}

	return acr_names;
}

// check if one of the school names contains a spelling error
get_name_spl(school_name:string, variance:number, beacons:any[])
{
    var t = []; // array to hold all the beacons with matching school names
		var ls = school_name.length;  //length of school name
		var school = school_name.toUpperCase();
		var testb; //variance: school name of each serched beacon
		var lb; //length of testb
		var j;  //differnce between lb and ls
		var flag = false; // flag to show the name is matched or not
		var comp;
		//start searching
		for (var i in beacons)
		{
			if (beacons[i].school!= undefined){
				testb = beacons[i].school;
				lb = testb.length;
				j = lb - ls;
				if (j <= variance && j>= -variance){
					testb = testb.toUpperCase();
					//if school name and testb have same length
					if (j==0){
						comp = 0
						for (var m =0;m<j;m++){
							if (testb[m]!=school[m]){
								comp++;
							}
						}
						if (comp <= variance){
							flag = true;
						}
					}
					//otherwise
					else{
						var shorter; //shorter string between school name and testb
						var longer;	//longer string between school name and testb
						var short_l; //length of shorter string
						if (j>0){
							short_l = ls
							shorter = school;
							longer = testb.toUpperCase();
						}else{
							short_l = lb;
							shorter = testb.toUpperCase();
							longer = school;
						}

						comp = 0;
						var ln = 0;
						var sn = 0;
						while (sn < short_l){
							if (shorter[sn] != longer[ln]){
								ln--;
								comp++;
							}
							ln++;
							sn++;
						}
						if (comp <= variance){
							flag = true;
						}
					}
				}
				//push matched beacon to array
				if (flag == true ){
					t.push(beacons[i]);
					flag = false;
				}
			}
		}
		// return array
    return t;
}

  // inserts a beacon with the given attributes into the database 
  // returns the BeaconID of the newly created beacon
  createBeacon(course:string, school:string, startTime:number, endTime:number, host:string, members:string[], tags:number[], description:string, lat:number, lng:number):string
  {
    // insert the beacon object into the database
    return this.database.ref('/beacon/').push({
  		school: school,
  		course: course.replace(/\s/g, "").toUpperCase(),
  		startTime: startTime,
  		endTime: endTime,
  		host: host,
      members: members,
  		tags: tags,
      description: description,
  		lat: lat,
  		lng: lng
  	  }).key;
  }

    // sets the maps lat and lng attributes given a position
  setPosition(lat, lng, address) 
  {
    
    if (lat != null)
    {
      this.lat = lat;
    }  
    if (lng != null)
    {
      this.lng = lng;
    }
    if (address != null)
    {
      this.address = address;
    }
    console.log(this.lat, this.lng)
  }

  // returns the maps current center latitude and longitude
  getMapCenter() {
    //console.log(this.lat);
    //console.log(this.lng);
    return {lat: this.lat, lng: this.lng, address: this.address};
  }

  // insert a user into the database
  // returns the UserID of the newly created user
  createUser(firstName:string, lastName:string, email:string)
	{
    var user = firebase.auth().currentUser;

    return this.database.ref('/user/').child(user.uid).set({
      firstName: firstName,
  		lastName: lastName,
  		email: email,
  		gravatar: null,
  		school: null,
  		biography: null,
  		courseCode: [],
  		chats: [],
  		beacons: []
    });
  }

  getCurrentUser(){
    var user = firebase.auth().currentUser;
    if (user != null){
      return this.getUserById(user.uid);
    }
    return null;
  }
  // returns the GuestUser or RegisteredUser object associated with the given userID
  getUserById(id:string):Promise<any>
  {
    return new Promise((resolve,reject) => {
        this.database.ref("/user/" + id).once("value").then(function(b){
        var user:any;
        // if email is not null / undefined, create a RegisteredUser object with the given ID
        if (b.child("email").val() != null && b.child("email") !== "undefined" )
        {
          user = new RegisteredUser(id);
        }
        // if email is null, create a GuestUser object with the given ID
        else
        {
          user = new GuestUser(id);
        }

        // return the RegisteredUser / GuestUser object
        resolve(user);
      });
    });
  }

  checkEmail(users:any[], email:string):boolean
  {
    console.log(email);
    if (typeof(email) === "undefined" || email == null)
    {
      return false;
    }
    else
    {
      for (var i in users)
      {
        if (typeof(users[i].email) !== "undefined" && users[i].email != null)
        {
          return true;
        }
      }

      return false;
    }
  }

  getUsers():Promise<any>{
    return new Promise((resolve,reject) => {
      this.database.ref("user").once("value").then(function(res){
        var users = {};
        for (var key in res)
        {
          if (typeof(res.val()[key].email) !== "undefined" && res.val()[key].email != null)
          {
            users[key] = new RegisteredUser(key);
          }
          else
          {
            users[key] = new GuestUser(key);
          }
          console.log(users[key]);
        }
        resolve(users);
      });
    }).catch(err => console.log(err))
  }

  getUserByEmail(email:string):Promise<any>{
    return new Promise((resolve,reject) => {
      this.database.ref("user").orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
        resolve(snapshot);
      });
    }).catch(err => console.log(err))
  }
}
