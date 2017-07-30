import * as firebase from 'firebase/app';
import {User, RegisteredUser, GuestUser} from './user';

export class Profile {
	userKey: string;
	userName: string;
	email: string;
	gravatar: string;
	school: string;
	biography: string;
	courseCode: string[] = [];
	database = firebase.database();
	
	// Taken from User class.
	constructor(userKey: string){
		// If no userKey is given, get a new one from the database
		if (userKey == null){
			// Attributes are null because they have had no opportunity to be set, this is the constructor
			this.userKey = this.database.ref('/user/').push({
				userName: null,
				email: null,
				gravatar: null,
				school: null,
				biography: null,
				courseCode: null
		  }).key;
		}
		// If a userKey is given, store it
		else
		{
			this.userKey = userKey;
		}
	
	}
	
	// Update profile when a user edits their profile.
	// deol5210@mylaurier.ca
	updateProfile(){
	
		this.database.ref('/user/' + this.userKey).set({
			userName: this.userName,
			email: this.email,
			gravatar: this.gravatar,
			school: this.school,
			biography: this.biography,
			courseCode: this.courseCode
		})
	
	}
	
	
	// Update profile vars from database.
	// deol5210@mylaurier.ca
	getProfile(){
		this.database.ref('/user/' + this.userKey).once('value').then(res => {
			var user = res.val();
			this.userName = user.userName,
			this.email = user.email,
			this.gravatar = user.gravatar,
			this.school = user.school,
			this.biography = user.biography,
			this.courseCode = user.courseCode
		});
		
	}
	
	/*
	* Getter methods.
	* deol5210@mylaurier.ca
	*/
	getUserName(){
		return this.userName;
	}
	
	getEmail(){
		return this.email;
	}
	
	getGravatar(){
		return this.gravatar;
	}
	
	getSchool(){
		return this.school;
	}
	
	getBiography(){
		return this.biography;
	}
	
	getCourseCode(){
		return this.courseCode;
	}
	
	/*
	* Setter methods.
	* deol5210@mylaurier.ca
	*/
	setEmail(email: string){
		this.email = email;
		this.updateProfile;
	}
	
	setGravatar(gravatar: string){
		this.gravatar = gravatar;
		this.updateProfile;
	}
	
	setSchool(school: string){
		this.school = school;
		this.updateProfile;
	}
	
	setBiography(biography: string){
		this.biography = biography;
		this.updateProfile;
	}
	
	setCourseCode(courseCode: string[]){
		this.courseCode = courseCode;
		this.updateProfile;
	}
}