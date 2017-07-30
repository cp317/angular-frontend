//Class Definitions
import * as firebase from 'firebase/app';
import { Beacon } from './beacon';
import { Chat } from './chat';

export class User
{
	userId:string;
	beacons:Beacon[] = [];
	profileImageURL:string;
  chats: Chat[]=[];
	database = firebase.database();

  constructor(userId:string)
	{
		// if no userId is given, get a new one from the database
		if (userId == null)
		{
			// generate a new userId if one is not already stored as a cookie
			if (!this.loadCookie())
			{
				// attributes are null because they have had no opportunity to be set
				this.setImage();
				this.userId = this.database.ref('/user/').push({
					firstName: null,
					lastName: null,
					email: null,
					gravatar: this.profileImageURL,
					school: null,
					biography: null,
					chats: this.chats,
					beacons: this.beacons
	  		  }).key;
			}
		}
		// if a userId is given, store it
		else
		{
			this.userId = userId;
		}
  }

	// add a beacon to the users array of beacons
	// kang8390@mylaurier.ca
  joinBeacon(b:Beacon)
	{
		this.beacons.push(b);
  }

	// remove a beacon to the users array of beacons
	// kang8390@mylaurier.ca
  leaveBeacon(b:Beacon)
	{
		//find the beacon in the beacon array
		for(var i in this.beacons)
		{
			//delete if found
			if(this.beacons[i].beaconId===b.beaconId)
			{
					this.beacons.splice(Number(i),1);
					break;
			}
		}
  }

	// get a gravitar image for the user, if non exists use a random icon from \src\assets\profileIcons
	// parr8740@mylaurier.ca
	setImage()
	{
    var randNum=Math.floor(Math.random()*3)+1;
    this.profileImageURL='src/assets/profileIcons/defaultImage' + randNum + '.png';
	}

	// parr8740@mylaurier.ca
	storeCookie()
	{
        var d = new Date();
        var dStr;
        d.setFullYear(d.getFullYear()+1);
        dStr.concat(d.toUTCString());
        document.cookie='userId=' + this.userId + ';' + 'expires=' + dStr + ';';
        encodeURIComponent(document.cookie);

	}

	// returns true if cookie is used and false otherwise
	// parr8740@mylaurier.ca
	loadCookie()
	{
		//this.userId = ...
		// return true if cookie is used and false otherwise
        var decodeCookie= decodeURIComponent(document.cookie);
        if(document.cookie.indexOf('=')==-1){
            document.cookie='userId=' + null + ';';
        }else{
            var cookieStr= document.cookie.split(';');
            var splitStr= cookieStr[0].split('=');
            this.userId=splitStr[1];
        }
    }
}

export class RegisteredUser {

  user:User; // the underlying user object, a javascript implementation of inheritance
	firstName:string;
	lastName:string;
	email:string;

  constructor(userId:string)
	{
		this.user = new User(userId);
  }

	isRegistered()
	{
		return true;
	}
}

export class GuestUser {

	user:User; // the underlying user object, a javascript implementation of inheritance

  constructor(userId:string)
	{
		// generate a new userId or read an existing one from a cookie
		this.user = new User(userId);
  }

	isRegistered()
	{
		return false;
	}
}
