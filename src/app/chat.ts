import * as firebase from 'firebase/app';
import { Message } from './message';
import { User } from './user';

export class Chat
{
	//Attributes
	chatId:string;
	messages:Message[];
	users:User[] = [];
	
	database = firebase.database();
	
	constructor(chatId:string)
	{	
		//Creates new chatId for new Chats.
		if (chatId == null)
		{
			this.chatId = this.database.ref('/chat/').push({}).key;
			this.messages = [];
		}
		//Gets the chatId, and Messages for existing Chats.
		else
		{
			this.chatId = chatId;
			this.updateChat();
		}
	}
	
	//Private
	//Helper method to writePrivateChatId().
	//Checks if a private Chat between Users exist.
	checkPrivateChatExists(): firebase.Promise<any>
	{
		return new Promise((resolve,reject) => 
		{
			var currentUserId:string = this.users[0].userId;
			var otherUserId:string = this.users[1].userId;
			this.database.ref('/user/' + currentUserId + '/privateChat/').once('value').then(function(chatId) 
			{	
				if (chatId.hasChild(otherUserId))
				{
					resolve(chatId.val()[otherUserId]);
				}
				else
				{
					resolve('');
				}
			});
		}).catch(err => console.log(err));
	}
	
	//Closes the Chat, removing the Chat and its Messages from the database.
	closeChat()
	{
		if (this.chatId != null)
		{
			this.database.ref('/chat/' + this.chatId + '/').remove();
			this.chatId = null;
			this.messages = [];
			this.users = [];
		}
	}

	//Creates a new Message in the Chat for the current User.
	createNewMessage(msgString:string, userId:string)
	{
		if (this.chatId != null)
		{
			this.database.ref('/chat/' + this.chatId + '/messages/').push({
				msgString: msgString,
				timestamp: this.createTimestamp(),
				sender: userId
			});
			this.updateChat();
		}
	}
	
	//Private
	//Creates a timestamp for a Messages in the Chat.
	//Format: "mm/dd/yyyy hh:mm:ss", Private function.
	createTimestamp()
	{
		var date = new Date();
		var day = date.getUTCDate();
		var year = date.getUTCFullYear();
		var month = date.getUTCMonth() + 1;
		var seconds = date.getUTCSeconds();
		var minutes = date.getUTCMinutes();
		var hours = date.getUTCHours();
		return '' + month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
	}
	
	//Returns the chatId of a Chat object.
	getChatId()
	{
		return this.chatId;
	}
	
	//Returns the array of Messages in a Chat object.
	getMessages()
	{
		return this.messages;
	}
	
	//Returns an array of Users in the Chat.
	getUsers()
	{
		return this.users;
	}
	
	//Private
	//Helper method to updateChat()
	//Queries the database to get all Messages inside a Chat table.
	queryForChatMessages(): firebase.Promise<any>
	{
		return new Promise((resolve,reject) => 
		{
			var messages:Message[] = [];
			this.database.ref('/chat/' + this.chatId + '/messages/').orderByKey().once('value').then(function(messageLog) 
			{	
				for (var messageKey in messageLog.val())
				{
					var messageData = messageLog.val()[messageKey];
					messages.push(new Message(messageData.msgString, messageData.timestamp, new User(messageData.sender)));
				}
			});
			
			resolve(messages);
		}).catch(err => console.log(err));
	}
	
	//Sets the Users of a Chat.
	setUsers(users:User[])
	{
		this.users = users;
	}
	
	//Updates the Chat object with all Messages that is in the current Chat table.
	updateChat()
	{
		if (this.chatId != null)
		{
			this.queryForChatMessages().then(messages => {this.messages = messages});
		}
	}
	
	//Writes the chatId into the User tables for both Users of a new private Chat, or sets the proper chatId if the chat already exists.
	writePrivateChatId()
	{	
		if (this.users.length == 2)
		{
			this.checkPrivateChatExists().then(res => {
				//If the Chat between the Users doesn't exist a new Chat is made.
				if (res == '')
				{
					this.database.ref('/user/' + this.users[0].userId + '/privateChat/').update({
						[this.users[1].userId] : this.chatId
					});
					this.database.ref('/user/' + this.users[1].userId + '/privateChat/').update({
						[this.users[0].userId] : this.chatId
					});
				}
				//If the Chat between the Users exists, it gets the Chat key and updates the Chat object.
				else
				{
					if (res != this.chatId)
					{
						this.chatId = res;
						this.updateChat();
					}
				}
			});
		}
	}
}
