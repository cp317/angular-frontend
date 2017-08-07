import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dialogService:DialogService) { }

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
    showConfirm() {
            let disposable = this.dialogService.addDialog(PasswordComponent, {
                title:'Reset Your Password', 
                message:'Enter in the email address linked to your account',
                })
                .subscribe((isConfirmed)=>{
                    if(isConfirmed) {
                        alert('A confirmation email has been sent to your email address');
                    }
                });
        }
}

export interface PasswordModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || 'Are you sure?'}}</p>
                   </div>
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="margin-left:15px;margin-top:-50px">
                            <input class="mdl-textfield__input" id="inputEmail3">
                            <label class="mdl-textfield__label" for="email">Email Address</label>
                         </div>
  
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()">Reset Password</button>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
              </div>`,
    styles: [`
    .modal {backgroundColor:rgba(0,0,0,0.6);}
  `]
})
export class PasswordComponent extends DialogComponent<PasswordModel, boolean> implements PasswordModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    this.result = true;
    this.close();
  }
}

