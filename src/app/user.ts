//Class Definitions
import * as firebase from 'firebase/app';
import { Beacon } from './beacon';

export class User
{
	userId:string;
	beacons:Beacon[] = [];
	profileImageURL:string;
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

  }

	// remove a beacon to the users array of beacons
	// kang8390@mylaurier.ca
  leaveBeacon(b:Beacon)
	{

  }

	// get a gravitar image for the user, if non exists use a random icon from \src\assets\profileIcons
	// parr8740@mylaurier.ca
	setImage()
	{
		// set image URL at profileImageURL
	}

	// parr8740@mylaurier.ca
	storeCookie()
	{
    //connect to firebase
        var database = firebase.database();
        //get users unique id
        var id = "userId=";
        //concat userid into the cookie string and add to the user's cookie
        document.cookie=id.concat(this.userId);
        var activeBeacons="beacons=";
        //get user's list of active beacons
        var beacons=database.ref('/User/'+this.userId+'/Beacons/');
        //loop through users active beacons and concat them into a single comma seperated string 
        for(var i in beacons)
            {
                activeBeacons.concat(i);
                activeBeacons.concat(",");
            }
        //push active beacons into the cookie
         document.cookie=activeBeacons;
        //check if user is a registereduser
   //     if(this.isRegistered()){
 //           var chats=database.ref('/user/'+this.userId+'/chats/')
  //          var chatCookie='chats=';
           // for(var a in chats)
        //        {
        //            chatCookie.concat(this.chats[a].chatId);
        //            chatCookie.concat(',');
        //        }
       //     document.cookie=chatCookie;
 //     }

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
 //   chats: Chat[]=[];

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
