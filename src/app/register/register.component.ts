import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  attemptRegistration(){
      var email = (<HTMLInputElement>document.getElementById("inputEmail3")).value;
      console.log(email)
      var password = (<HTMLInputElement>document.getElementById("inputPassword3")).value;
      console.log(password)
      this.registerUser(email,password)
  }

  registerUser(email:string, password:string){
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(
        function(error){
          var errorCode = error.stack;
          var errorMessage = error.message
          console.log(error.message)
        });
  }

  registerAnonUser(email:string, password:string){
    var credential = firebase.auth.EmailAuthProvider.credential(email, password)
    firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
      console.log("Anonymous account successfully upgraded", user);
    }, function(error) {
        console.log("Error upgrading anonymous account", error.message);
    });
  }

}
