//Class Definitions
import { Beacon } from './beacon';

export class User
{
	beacons:Beacon[] = [];
	profileImageURL:string;

  constructor(firstName:string, lastName:string, email:string)
	{
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
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
	
	// parr8740@mylaurier.ca
	loadCookie()
	{
	
	}
}

export class RegisteredUser {

  user:User; // the underlying user object, a javascript implementation of inheritance
	chat:Chat[] = [];
	firstName:string;
	lastName:string;
	email:string;

  constructor(user:User)
	{
		this.user = user;
  }
	
	


}

export class GuestUser {

	user:User; // the underlying user object, a javascript implementation of inheritance

  constructor(user:User)
	{
		this.user = user;
  }
}
