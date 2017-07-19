export class User 
{
	this.firstName:string;
	this.lastName:string;
	this.email:string;
	this.beacons:Beacon[];

  constructor(firstName:string, lastName:string, email:string)
	{
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
  }
  joinBeacon()
	{

  }
  leaveBeacon()
	{

  }
}

export class RegisteredUser {

  user:User; // the underlying user object, a javascript implementation of inheritance
	
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

	// 
  registerUser()
	{

  }
}
