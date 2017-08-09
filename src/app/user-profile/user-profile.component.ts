
import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from '../user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
	
	private registeredUsers: registeredUser[] = [];
	
	constructor(){}
	
	ngOnInit(){
	
	}
	
}