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

 openChat(){
	document.getElementById("chatSidenav").style.width = "169px";
	this.populateSidebarBeacon();
}

 closeChat(){
	document.getElementById("chatSidenav").style.width = "0";
}

populateSidebarUser(User){

}

populateSidebarBeacon(){
	var element = document.getElementById("chatListBeacon"); // Main doodad -OC
	var division = document.createElement("div"); // Child of element -OC
	division.id = "beacon-part"; // id for div -OC
	var i;
	for( i = 0; i < 10; i++){
		var para = document.createElement("p"); // child of division -OC
		para.style.padding = "0 5px"; //stylizing -OC
		var node = document.createTextNode("This is testing");
		para.appendChild(node); // appends text to para -OC
		division.appendChild(para); //appends para to division -OC
	}
	element.appendChild(division); //appends division to element -OC
}

testfunc(){
	var temp = firebase.auth().currentUser;
	console.log(temp);
}
}
