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

	}

	// returns true if cookie is used and false otherwise
	// parr8740@mylaurier.ca
	loadCookie()
	{
		//this.userId = ...
		// return true if cookie is used and false otherwise
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
