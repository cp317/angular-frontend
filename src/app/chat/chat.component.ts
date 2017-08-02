import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-chat-component',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
	
	constructor () { }
	
	ngOnInit() {
	}
	
 openChat(){
	document.getElementById("chatSidenav").style.width = "250px";
}

 closeChat(){
	document.getElementById("chatSidenav").style.width = "0";
}
}