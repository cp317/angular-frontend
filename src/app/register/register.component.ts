import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

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
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.stack;
        var errorMessage = error.message;
        console.log(error.message);;
    });
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
    var credential = firebase.auth.EmailAuthProvider.credential(email, password)
    firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
      console.log("Anonymous account successfully upgraded", user);
    }, function(error) {
        console.log("Error upgrading anonymous account", error.message);
    });

    var user = firebase.auth().currentUser;
    if (user != null){
      //Add the user to the info database
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
    }
  }

}
