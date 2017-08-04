import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as firebase from 'firebase/app';


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
	this.populateSidebarBeacon();
	this.populateSidebarUser();
}
// Closes the chatSidenav for chats and unpopulates them -OC
closeChat(){
	document.getElementById("chatSidenav").style.width = "0";
    this.unPopulateSidebar();
}

// Populates the User Chat(s) for chatSidenav, currently adds dummy text -OC
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

// Populates the Beacon Chat(s) for chatSidenav, currently adds dummy text -OC
populateSidebarBeacon(){
	var bElement = document.getElementById("chatListBeacon"); // Main div being added to -OC
	var bHeader = document.createElement("h2"); // Create the header for Beacon chats -OC
	bHeader.style.padding = "0 5px"; // Stylize the header -OC
	bHeader.style.fontSize = "20px";
	var bHeadText = document.createTextNode("Beacon Chat"); // Header text -OC
	bHeader.appendChild(bHeadText);
	var bDivision = document.createElement("div"); // Child of bElement -OC
	bDivision.id = "beacon-part"; // id for div -OC
	bDivision.appendChild(bHeader); // Add bHeader to bDivision -OC
	// Loops through adding dummy text -OC
	var i;
	for( i = 0; i < 10; i++){
		var bPara = document.createElement("p"); // Child of bDivision -OC
		bPara.style.padding = "0 5px"; // Stylizing dummy text -OC
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
}

}
