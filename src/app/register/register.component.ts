import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { WebAPI } from '../web-api.service';
import { User, RegisteredUser, GuestUser } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  loginGuest() {
    firebase.auth().signInAnonymously().then(function(user){
        console.log('logged in as anon');
        user.isAnonymous=true;
        firebase.database().ref('/user/' + user.uid).set({
            firstName: null,
            lastName: null,
            email: null,
            profileImageURL: null,
            school: null,
            biography: null,
            courses: null,
            chats: null,
            beacons: null});
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.stack;
        var errorMessage = error.message;
        console.log(error.message);;
    });
    
    alert("signed in as guest");
  }

  attemptRegistration() {
    var valid = 1;
    var user = firebase.auth().currentUser;

    // checks emails to make sure they match
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    if (email != (<HTMLInputElement>document.getElementById("emailc")).value) 
    {
      valid = 0;
    }
   
    // checks passwords to make sure they match
    var password = (<HTMLInputElement>document.getElementById("pass")).value;
    if (password != (<HTMLInputElement>document.getElementById("passc")).value)
    {
      valid = 0;
    }

    // if all the fields match, register the user
    if (valid == 1)
    {
        
        if(user.isAnonymous==true){
            this.registerAnonUser(email,password);
        }else{
            this.registerUser(email,password);

        }
    
    }
  }

  registerUser(email:string, password:string){
    var user = firebase.auth().currentUser;

   
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(
        function(error){
          var errorCode = error.stack;
          var errorMessage = error.message;

          if (errorMessage = "The email address is already in use by another account.")
          {
            alert(errorMessage);
          }

          console.log(errorCode + " " + errorMessage);
        });

      if (user != null){
        //Add the user to the info database
				alert("Account created successfully!")
        firebase.database().ref('/user/' + user.uid).set({
  				firstName: null,
  				lastName: null,
  				email: user.email,
  				profileImageURL: null,
  				school: null,
  				biography: null,
  				courses: null,
  				chats: null,
  				beacons: null});
      }
      
  }

  registerAnonUser(email:string, password:string){
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(email, password)
    firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
      console.log("Anonymous account successfully upgraded", user);
    }, function(error) {
        console.log("Error upgrading anonymous account", error.message);
    });
      this.getUserById(user.uid).then(guest=>{
    firebase.database().ref('/user/' + user.uid).set({
        firstName: null,
        lastName: null,
        email: null,
        profileImageURL: null,
        school: null,
        biography: null,
        courses: null,
        chats: guest.chats,
        beacons: guest.beacons});
      });
      //Add the user to info database
      
    
    alert("guest user registered");
  }
    
  getUserById(id:string):Promise<any>
  {
    return new Promise((resolve,reject) => {
        firebase.database().ref("/user/" + id).once("value").then(function(b){
        var user:any;
        // if email is not null / undefined, create a RegisteredUser object with the given ID
        if (b.child("email").val() != null && b.child("email") !== "undefined" )
        {
          user = new RegisteredUser(id);
        }
        // if email is null, create a GuestUser object with the given ID
        else
        {
          user = new GuestUser(id);
        }

        // return the RegisteredUser / GuestUser object
        resolve(user);
      });
    });
  }

}
