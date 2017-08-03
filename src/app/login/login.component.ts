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
      var user = firebase.auth().currentUser;
      if(user.isAnonymous){
          var credential = firebase.auth.EmailAuthProvider.credential(email, password)
          firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
            console.log("Anonymous account successfully upgraded", user);
          }, function(error) {
              console.log("Error upgrading anonymous account", error.message);
          });
          
      }else{
        firebase.auth().signInWithEmailAndPassword(email, password).catch(
        function(error){
          var errorCode = error.stack;
          var errorMessage = error.message
          console.log(error.message)
        });
      }

  }
    loginGuest(){
        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.stack;
            var errorMessage = error.message;
            console.log(error.message);;
        
            });
}
}
