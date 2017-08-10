
import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from '../user';

import { WebAPI } from '../web-api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
	
	private registeredUsers: any[] = [];
	
	constructor(private webAPI: WebAPI){}
	
	ngOnInit(){
		this.getNames();
	}
	
	getNames(){
		this.webAPI.getCurrentUser().then(res => {
		this.registeredUsers = res;
		
		});
	}
	
}