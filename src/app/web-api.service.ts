import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {User, RegisteredUser, GuestUser} from './user';

@Injectable()
export class WebAPI {
  database = firebase.database();

  constructor() { }

  getBeacons(school:string): firebase.Promise<any>
  {
    return new Promise((resolve,reject) =>
    {
      this.database.ref('/beacon/').once('value').then( res =>
      {
        var beacons = {};
        var validSchoolNames = [];
        if (school != null)
        {
          validSchoolNames.push(school);

          // get any names that are a substring of the given school name
          // or that the school name is a substring of
          var schoolNames = this.getSchoolNameSubstr(res.val(),school)
          for (let name of schoolNames)
          {
            if (!validSchoolNames.includes(name))
            {
              validSchoolNames.push(name);
            }
          }
          // get any acronyms of the school name
          for (let name of validSchoolNames)
          {
            schoolNames = this.get_name_acr(res.val(), name);
            for (let name_acr of schoolNames)
            {
              if(!validSchoolNames.includes(name_acr))
              {
                validSchoolNames.push(name_acr);

                if (name_acr.length > school.length)
                {
                  // orignal school name was an acronym so get school names of the full version
                  var schoolNames = this.getSchoolNameSubstr(res.val(),name_acr)
                  for (let name of schoolNames)
                  {
                    if (!validSchoolNames.includes(name))
                    {
                      validSchoolNames.push(name);
                    }
                  }
                }
              }
            }
          }

        }
        if (school != null)
        {
          console.log(validSchoolNames);
          for (let key in res.val())
          {
            if (validSchoolNames.includes(res.val()[key].school))
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
        console.log(beacons);
        resolve(beacons);
      });
    }).catch(err => console.log(err))
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
 get_acr(school_name:string){
	//init the array
	var acr_names = [];
	var split_name = school_name.split(" ");
	var acr = "";
	var flag = false;

	//push the acronym to acr_names and check whether the name contains 'of' or not
	for (var i in split_name){
		acr += split_name[i][0]
		if(split_name[i].toUpperCase() == "OF"){
			flag = true;
		}
	}

	acr_names.push(acr.toUpperCase());
	acr = "";

	//push the new acronym without 'of', if the flag is set to true
	if(flag){
		for (var i in split_name){
			if(split_name[i].toUpperCase() != "OF"){
				acr += split_name[i][0]
			}
		}
		acr_names.push(acr.toUpperCase());
	}

	return acr_names;
}

  // inserts a beacon with the given attributes into the database
  // returns the BeaconID of the newly created beacon
  createBeacon(course:string, school:string, startTime:number, endTime:number, host:string, members:string[], tags:string, lat:number, lng:number):string
  {
    // insert the beacon object into the database
    return this.database.ref('/beacon/').push({
  		school: school,
  		course: course,
  		startTime: startTime,
  		endTime: endTime,
  		host: host,
      members: members,
  		tags: tags,
  		lat: lat,
  		lng: lng
  	  }).key;
  }

  // insert a user into the database
  // returns the UserID of the newly created user
  createUser(firstName:string, lastName:string, email:string)
	{
    return this.database.ref('/user/').push({
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

  // returns the GuestUser or RegisteredUser object associated with the given userID
  getUserById(id:string):Promise<any>
  {
    return new Promise((resolve,reject) => {
        this.database.ref("user/" + id).once("value").then(function(b){
        var user:any;

        // if email is not null / undefined, create a RegisteredUser object with the given ID
        if (typeof(b.val().email) !== "undefined")
        {
          user = new RegisteredUser(id);
        }
        // if email is null, create a GuestUser object with the given ID
        else
        {
          user = new GuestUser(id);
        }

        // return the RegisteredUser / GuestUser object
        //console.log(user);
        resolve(user);
      });
    });
  }

  getUserByEmail(email:string):Promise<any>{
    return new Promise((resolve,reject) => {
      this.database.ref("user").orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
        resolve(snapshot);
      });
    }).catch(err => console.log(err))
  }
}
