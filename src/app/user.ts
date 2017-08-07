//Class Definitions
import * as firebase from 'firebase/app';
import { Beacon } from './beacon';
import { Chat } from './chat';
import { Md5 } from 'ts-md5/dist/md5';

export class User
{
	userId:string;
	beacons:Beacon[] = [];
	profileImageURL:string;
	chats: Chat[]=[];
	database = firebase.database();

  constructor(userId:string)
	{
		// if no userId is given, check for one in a cookie
		if (userId == null)
		{
			this.loadCookie()
		}
		// if a userId is given, store it
		else
		{
			this.userId = userId;
		}
  }

	// add a beacon to the users array of beacons
	// kang8390@mylaurier.ca
  joinBeacon(b:Beacon){
		this.beacons.push(b);
  }

	// remove a beacon to the users array of beacons
	// kang8390@mylaurier.ca
  leaveBeacon(b:Beacon){
		//find the beacon in the beacon array
		for(var i in this.beacons){
			//delete if found
			if(this.beacons[i].beaconId===b.beaconId){
					this.beacons.splice(Number(i),1);
					break;
			}
		}
  }

	// get a gravitar image for the user, if non exists use a random icon from \src\assets\profileIcons
	// parr8740@mylaurier.ca
	setImage(){
		var randNum=Math.floor(Math.random()*3)+1;
		this.profileImageURL='src/assets/profileIcons/defaultImage' + randNum + '.png';
	}

	// stores the user's userID as a cookie
	// parr8740@mylaurier.ca
	storeCookie(){
        var d = new Date();
        d.setFullYear(d.getFullYear()+1);
        document.cookie='userId=' + this.userId + ';' + 'expires=' + d + ';';
        encodeURIComponent(document.cookie);
	}

	// attempts to load the user's userID from a cookie
	// parr8740@mylaurier.ca
	loadCookie(){
        var decodeCookie= decodeURIComponent(document.cookie);
        if(document.cookie.indexOf('=')==-1){
            document.cookie='userId=' + null + ';';
        } else {
            var cookieStr= document.cookie.split(';');
            var splitStr= cookieStr[0].split('=');
            this.userId=splitStr[1];
        }
    }
    loadUserId(){
        var user = firebase.auth().currentUser;
        if(user){
            // user is already signed in
            this.userId=user.uid
        }else{
            this.userId=null;
        }

    }
}

export class RegisteredUser {

	user:User; // the underlying user object, a javascript implementation of inheritance
	firstName:string;
	lastName:string;
	email:string;
	biography:string;
	school:string;
	gravatar:string;
	courses:string[] = [];

	constructor(userId:string){
		this.user = new User(userId);
		this.loadUser();
		this.user.storeCookie();
	}

	loadUser(){
		this.user.database.ref('/user/' + this.user.userId).once('value').then(res => {
			var user = res.val();
			this.firstName = user.firstName;
			this.lastName = user.lastName;
			this.email = user.email;
			this.user.profileImageURL = user.profileImageURL;
			this.gravatar = user.gravatar;
			this.school = user.school;
			this.biography = user.biography;
			if (typeof(user.chats) !== "undefined")
			{
				this.user.chats = user.chats;
			}
			if (typeof(user.beacons) !== "undefined")
			{
				this.user.beacons = user.beacons;
			}
			if (typeof(user.courses) !== "undefined")
			{
				this.courses = user.courses;
			}
		});
	}

	isRegistered(){
		return true;
	}

	// Update profile when a user edits their profile.
	// deol5210@mylaurier.ca
	storeUser()
	{
		this.user.database.ref('/user/' + this.user.userId).set({
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			profileImageURL: this.user.profileImageURL,
			gravatar: this.gravatar,
			school: this.school,
			biography: this.biography,
			courses: this.courses,
			chats: this.user.chats,
			beacons: this.user.beacons
		});

	}

	/*
	* Getter methods.
	* deol5210@mylaurier.ca
	*/
	getName(){
		return this.firstName + " " + this.lastName;
	}

	getEmail(){
		return this.email;
	}

	getGravatar(){
		// If user is new then we will check and set their gravatar.
		if (this.gravatar == ''){
			let hash = this.email.trim();
			hash = <string>Md5.hashStr(this.gravatar.toLowerCase());
			this.gravatar = 'https://www.gravatar.com/avatar/' + hash + "?s=500";
			this.storeUser();
		}
		//Otherwise just return the gravatar.
		return this.gravatar;
	}

	getSchool(){
		return this.school;
	}

	getBiography(){
		return this.biography;
	}

	getCourse(){
		return this.courses;
	}

	/*
	* Setter methods.
	* deol5210@mylaurier.ca
	*/
	setEmail(email: string){
		this.email = email;
		this.storeUser();
	}

	setGravatar(){
		// If the user has changed their gravatar and wants to update it on Study Space.
		let hash = this.email.trim();
		hash = <string>Md5.hashStr(this.gravatar.toLowerCase());
		this.gravatar = 'https://www.gravatar.com/avatar/' + hash + "?s=500"

		this.storeUser();
	}

	setSchool(school: string){
		this.school = school;
		this.storeUser();
	}

	setBiography(biography: string){
		this.biography = biography;
		this.storeUser();
	}

	addCourse(course: string){
		this.courses.push(course);
		this.storeUser();
	}
}

export class GuestUser {

	user:User; // the underlying user object, a javascript implementation of inheritance

	constructor(userId:string){
		// generate a new userId or read an existing one from a cookie
		this.user = new User(userId);
		if (userId != null)
		{
			this.loadUser();
		}
		else
		{
			this.user.setImage();
			this.storeUser();
		}
		this.user.storeCookie();
	}

	isRegistered(){
		return false;
	}

	storeUser()
	{
		if (this.user.userId == null)
		{
			console.log("No uid.")
		}
		else
		{
			this.user.database.ref('/user/' + this.user.userId).set({
				firstName: null,
				lastName: null,
				email: null,
				profileImageURL: this.user.profileImageURL,
				school: null,
				biography: null,
				courses: null,
				chats: this.user.chats,
				beacons: this.user.beacons
			});
		}
	}

	loadUser()
	{
		this.user.database.ref('/user/' + this.user.userId).once('value').then(res => {
			var user = res.val();
			//this.user.profileImageURL = user.profileImageURL;
			if (res.hasChild("chats"))
			{
				this.user.chats = user.chats;
			}
			if (res.hasChild("beacons"))
			{
				this.user.beacons = user.beacons;
			}
		});
	}
}
