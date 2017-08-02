import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      
      

  }

  attemptLogin(){
    var email = (<HTMLInputElement>document.getElementById("inputEmail3")).value;
    console.log(email)
    var password = (<HTMLInputElement>document.getElementById("inputPassword3")).value;
    console.log(password)
    this.loginUser(email,password)
  }
  loginUser(email:string,password:string){
      //TODO: Replace with the data coming from the form
      firebase.auth().signInWithEmailAndPassword(email, password).catch(
        function(error){
          var errorCode = error.stack;
          var errorMessage = error.message
          console.log(error.message)
        });

  }
    loginGuest(){
        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.stack;
            var errorMessage = error.message;
            console.log(error.message);;
        
            });
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            // ...
            } else {
            // User is signed out.
            }
    });
}
}
