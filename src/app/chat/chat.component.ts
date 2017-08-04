import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as firebase from 'firebase/app';

// Authors Martin Symington (OC) & Paul Hohbaum
@Component({
    selector: 'app-chat-component',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
	private database = firebase.database();
	constructor () { }
	ngOnInit() {
	}

// Opens up the chatSidenav for chats and calls the population functions -OC
 openChat(){
	document.getElementById("chatSidenav").style.width = "169px";
	// var temp = firebase.auth().currentUser; //uncomment when we have the ability to log in a user -OC 
	this.populateSidebarBeacon();
	this.populateSidebarUser();
}
// Closes the chatSidenav for chats and unpopulates them -OC
closeChat(){
	document.getElementById("chatSidenav").style.width = "0";
    this.unPopulateSidebar();
}

/* Dummy functions, delete multi line comment when user authentication is working. -OC 
// Populates the User Chat(s) for chatSidenav -OC
populateSidebarUser(u:User){
	var uElement = document.getElementById("chatListUser"); // Main div being added to -OC 
	var uHeader = document.createElement("h1"); // Create the header for User chats -OC
	uHeader.style.padding = "0 5px"; // Stylize the header -OC
	uHeader.style.fontSize = "20px";
	var uHeadText = document.createTextNode("User Chat"); // Header text -OC
	uHeader.appendChild(uHeadText);
	var uDivision = document.createElement("div"); // Child of uElement -OC
	uDivision.id = "user-part"; // id for div -OC
	uDivision.appendChild(uHeader); // Add uHeader to uElement
	// Loops through adding Chat objects -OC
	var uList[] = u.chats;
	var j;
	for( j = 0; j < uList.length(); j++){
		var uLink = document.createElement("a"); // Child of uDivision -OC 
		uLink.style.padding = "0 5px"; // Align the chat(s) with header -OC
		var uNode = document.createTextNode(uList[j].chatId);
		uLink.appendChild(uNode); // Adds the uNode link to uLink -OC
		uDivision.appendChild(uLink); // Adds uLink to uDivision -OC
	} // End of loop -OC 
	uElement.appendChild(uDivision); // Adds uDivision to uElement -OC
}
// Populates the Beacon Chat(s) for chatSidenav -OC
populateSidebarBeacon(u:User){
	var bElement = document.getElementById("chatListBeacon"); // Main div being added to -OC
	var bHeader = document.createElement("h2"); // Create the header for Beacon chats -OC
	bHeader.style.padding = "0 5px"; // Stylize the header -OC
	bHeader.style.fontSize = "20px";
	var bHeadText = document.createTextNode("Beacon Chat"); // Header text -OC
	bHeader.appendChild(bHeadText);
	var bDivision = document.createElement("div"); // Child of bElement -OC
	bDivision.id = "beacon-part"; // id for div -OC
	bDivision.appendChild(bHeader); // Add bHeader to bDivision -OC
	// Loops through adding Beacon chats -OC
	var bList[] = u.beacons;
	var i;
	for( i = 0; i < 10; i++){
		var bLink = document.createElement("a"); // Child of uDivision -OC
		bLink.style.padding = "0 5px"; //Align the chat(s) to the header -OC 
		var bNode = document.createTextNode(bList[i].chat.chatId);
		bLink.appendChild(bNode); // Adds the bNode to bLink -OC 
		bDivision.appendChild(bLink); // Adds bLink to bDivision -OC 
	} // End of loop -OC 
	bElement.appendChild(bDivision); // Adds bDivision to bElement

*/

// Populates the User Chat(s) for chatSidenav, currently adds dummy text, delete code when user authentication is working -OC
populateSidebarUser(){
	var uElement = document.getElementById("chatListUser"); // Main div being added to -OC
	var uHeader = document.createElement("h1"); // Create the header for User chats -OC
	uHeader.style.padding = "0 5px"; // Stylize the header -OC
	uHeader.style.fontSize = "20px";
	var uHeadText = document.createTextNode("User Chat"); // Header text -OC
	uHeader.appendChild(uHeadText);
	var uDivision = document.createElement("div"); // Child of uElement -OC
	uDivision.id = "user-part"; // id for div -OC
	uDivision.appendChild(uHeader); // Add uHeader to uElement
	// Loops through adding dummy text -OC
	var j;
	for( j = 0; j < 10; j++){
		var uPara = document.createElement("p"); // Child of uDivision -OC
		uPara.style.padding = "0 5px"; // Stylizing dummy text -OC
		var uNode = document.createTextNode("This is user testing");
		uPara.appendChild(uNode); // Adds text to uPara -OC
		uDivision.appendChild(uPara); // Adds uPara to uDivision -OC
	} // End of loop -OC
	uElement.appendChild(uDivision); // Adds uDivision to uElement -OC
}

// Populates the Beacon Chat(s) for chatSidenav, currently adds dummy text, delete code when user authentication is working -OC
populateSidebarBeacon(){
	var bElement = document.getElementById("chatListBeacon"); // Main div being added to -OC
	var bHeader = document.createElement("h2"); // Create the header for Beacon chats -OC
	bHeader.style.padding = "0 5px"; // Stylize the header -OC
	bHeader.style.fontSize = "20px";
	var bHeadText = document.createTextNode("Beacon Chat"); // Header text -OC
	bHeader.appendChild(bHeadText);
	var bDivision = document.createElement("div"); // Child of bElement -OC
	bDivision.id = "beacon-part"; // id for div -OC
	bDivision.style.fontSize = "20px"; 
	bDivision.appendChild(bHeader); // Add bHeader to bDivision -OC
	// Loops through adding dummy text -OC
	var i;
	for( i = 0; i < 10; i++){
		var bPara = document.createElement("button"); // Child of bDivision -OC
		bPara.style.padding = "20px 5px"; // Stylizing dummy text -OC
		//bPara.style.fontSize = "16px"; 
		bPara.addEventListener("click", this.unPopulateSidebar); // For learning how to do things dynamically w/ buttons in JS -OC 
		var bNode = document.createTextNode("This is beacon testing");
		bPara.appendChild(bNode); // Adds text to bPara -OC
		bDivision.appendChild(bPara); // Adds bPara to bDivision -OC
	} // End of loop -OC
	bElement.appendChild(bDivision); // Adds bDivision to bElement -OC
}

//IGNORE BUT DO NOT DELETE PL0X -OC
testfunc(){
	var temp = firebase.auth().currentUser;
	console.log(temp);
}

//Unpopulates the sidebar -Paul 
// Updated -OC
unPopulateSidebar(){
    var bElement = document.getElementById("chatListBeacon");
	var uElement = document.getElementById("chatListUser");
    var bDivision = document.getElementById("beacon-part");
	var uDivision = document.getElementById("user-part");
    bElement.removeChild(bDivision);
	uElement.removeChild(uDivision);
}

//Refreshes the sidebar, nearly instantly, A+ -Paul
refreshSidebar(){
    this.closeChat();
    this.openChat();
    console.log("Ni");
    console.log("Ahhhhh refreshing");
}

//Opens the chat popup box for users -Paul
userChatPopupBox(currentUser,recipientUser){
    var currentUser = currentUser; //The current user
    var chatUser = chatUser; //Person the current user is talking to
    
}

//Opens the chat popup box for beacons -Paul
beaconChatPopupBox(currentUser,beacon){
    var currentUser = currentUser; //The current user
    var beacon = beacon; //Person the current user is talking to
    
}

/* Un-multiline comment when user authentication is ready -OC 
// Creates the main button portion for Beacon chats when passed a Beacon object. -OC
beaconButtonCreation(b:Beacon){
	var bElement = document.getElementById("beacon-part"); // Sets the main element to the div created prior --OC
	var bButt = document.createElement("button");
	bButt.style.padding = "20px 5px"; //Button size -OC 
	bButt.addEventListener("click", beaconChatPopupBox(currentUser, beacon)); // Calls the proper function on click -OC
	var cnDiv = document.createElement("div"); // Course Name Div retrieved from passed beacon -OC
	var memDiv = document.createElement("div"); // Members Div retrieved from passed beacon -OC 
	var trDiv = document.createElement("div"); // Time Remaining Div retrieved from passed beacon -OC
	var courseName = document.createTextNode(b.course); // Course Name text -OC 
	
}
*/
}
