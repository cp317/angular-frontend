import { User } from './user';

export class Message
{
	//Attributes
	msgString:string;
	timestamp:string;
	sender:User;

	constructor(msgString:string, timestamp:string, sender:User)
	{
		this.msgString = msgString;
		this.timestamp = timestamp;
		this.sender = sender;
	}
	
	getMsgString()
	{
		return this.msgString;
	}

	getTimestamp()
	{
		return this.timestamp;
	}

	getSender()
	{
		return this.sender;
	}
}