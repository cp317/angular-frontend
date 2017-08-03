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
}

 closeChat(){
	document.getElementById("chatSidenav").style.width = "0";
}

populateSidebarUser(User){

}

populateSidebarBeacon(){
	
	var i;
	for( i = 0; i < 10; i++){
		var element = document.getElementById("chatListBeacon");
		var para = document.createElement("p");
		var node = document.createTextNode("This is testing");
		para.appendChild(node);
		element.appendChild(para);
	}
}

testfunc(){
	var temp = firebase.auth().currentUser;
	console.log(temp);
}
}
