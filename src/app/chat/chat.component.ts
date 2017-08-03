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
	
	var beaconPart = document.getElementById("chatListBeacon");
	var division = document.createElement("div");
	division.id = "beacon-part";
	var i;
	for( i = 0; i < 10; i++){
		var element = document.getElementById("chatListBeacon");
		var para = document.createElement("p");
		para.style.padding = "0 5px";
		var node = document.createTextNode("This is testing");
		para.appendChild(node);
		beaconPart.appendChild(para);
	}
	element.appendChild(beaconPart);
}

testfunc(){
	var temp = firebase.auth().currentUser;
	console.log(temp);
}
}
