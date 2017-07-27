import * as firebase from 'firebase/app';
import { Message } from './message';
import { User } from './user';

export class Chat
{
	chatId:string;
	messages:Message[];
	database = firebase.database();
	
	constructor(chatId:string)
	{	
		if (chatId == null)
		{
			this.chatId = this.database.ref('/chat/').push({}).key;
			this.messages = [];
		}
		else
		{
			this.chatId = chatId;
			this.messages = this.queryChatDatabase();
		}
	}
	
	closeChat()
	{
		this.database.ref('/chat/' + this.chatId + '/').remove();
		this.messages = [];
	}

	//Creates a new Message for currentt User
	createNewMessage(msgString:string, userId:string)
	{
		this.database.ref('/chat/' + this.chatId + '/').push({
			msgString: msgString,
			timestamp: this.createTimestamp(),
			sender: userId
		});
		this.updateChat();
	}
	
	/*Format: "mm/dd/yyyy hh:mm:ss", Private function*/
	createTimestamp()
	{
		var date = new Date();
		var day = date.getUTCDate();
		var year = date.getUTCFullYear();
		var month = date.getUTCMonth() + 1;
		var seconds = date.getUTCSeconds();
		var minutes = date.getUTCMinutes();
		var hours = date.getUTCHours();
		return '' + day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
	}
	
	getChatID()
	{
		return this.chatId;
	}
	
	getMessage(position:number)
	{
		if (position >= 0 && position < this.numberOfMessages())
		{
			return this.messages[position];
		}
		else
		{
			return null;
		}
	}
	
	getMessages()
	{
		return this.messages;
	}
	
	//Returns the number of Messages in the chat.
	numberOfMessages()
	{
		return this.messages.length;
	}
	
	//Private Method
	queryChatDatabase()
	{
		var messages:Message[] = [];
		this.database.ref('/chat/' + this.chatId + '/').orderByKey().on("value", function(messageLog) 
		{	
			for (var messageKey in messageLog.val())
			{
				var messageData = messageLog.val()[messageKey];
				messages.push(new Message(messageData.msgString, messageData.timestamp, new User(messageData.sender)));
			}
		});
		
		return messages;
	}
	
	//Gets all Messages that the current Chat instanse is missing.
	updateChat()
	{
		this.messages = this.queryChatDatabase();	
	}
	
}
