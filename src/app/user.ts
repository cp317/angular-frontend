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
				// attributes are null because they have had no opportunity to be set, this is the constructor
				this.userId = this.database.ref('/user/').push({
	  			profileImageURL: null,
					beaconId: null
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
		var index: number =0;
		//search b in the beacon list and delete
		for(var i:Beacon in this.beacons)
		{
			if(b.beaconId===i.beaconId)
			{
				this.beacons.splice(index,1);
				break;
			}
			
			index++;
		}
    }

	// get a gravitar image for the user, if non exists use a random icon from \src\assets\profileIcons
	// parr8740@mylaurier.ca
	setImage()
	{
        var randNum=Math.floor(Math.random()*3)+1;
        this.profileImageURL='defaultImage';
        this.profileImageURL.concat(String(randNum));
        this.profileImageURL.concat('.png');
	}

	// parr8740@mylaurier.ca
	storeCookie()
	{
    //connect to firebase
        var database = firebase.database();
        //get users unique id
        var cookieStr = "userId=";
        //concat userid into the cookie string and add to the user's cookie
        cookieStr.concat(this.userId);
        cookieStr.concat(';');
        cookieStr.concat("beacons=");
        //get user's list of active beacons
        var beacons=database.ref('/User/'+this.userId+'/Beacons/');
        //loop through users active beacons and concat them into a single comma seperated string 
        for(var i in this.beacons)
            {
                cookieStr.concat(this.beacons[i].beaconId);
                cookieStr.concat(",");
            }
        cookieStr.concat(";");


        //check if user is a registereduser
        if(this.isRegistered()){
            var chats=database.ref('/user/'+this.userId+'/chats/')
            cookieStr.concat("chats=");
            //loop through user's active chats and concat them together
            for(var a in this.chats)
                {
                    cookieStr.concat(this.chats[a].chatId);
                    cookieStr.concat(',');
                }
            cookieStr.concat(';')
      }
        var d = new Date();
        d.setMonth(d.getMonth()+1);
        cookieStr.concat(d.toUTCString());
        cookieStr.concat(';');
        document.cookie=cookieStr;

	}

	// returns true if cookie is used and false otherwise
	// parr8740@mylaurier.ca
	loadCookie()
	{
		//this.userId = ...
		// return true if cookie is used and false otherwise
	}
    isRegistered(){
        
    }
}

export class RegisteredUser {

  user:User; // the underlying user object, a javascript implementation of inheritance
	firstName:string;
	lastName:string;
	email:string;


  constructor(user:User, firstName:string, lastName:string, email:string)
	{
		this.user = user;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
  }

	isRegistered()
	{
		return true;
	}
}

export class GuestUser {

	user:User; // the underlying user object, a javascript implementation of inheritance

  constructor()
	{
		// generate a new userId or read an existing one from a cookie
		this.user = new User(null);
  }

	isRegistered()
	{
		return false;
	}
}
