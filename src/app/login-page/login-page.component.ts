import { Component, OnInit } from '@angular/core';
declare let componentHandler: any; 

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
ngAfterViewInit() {
    componentHandler.upgradeDom(); // upgrade all mdl components
  }
}
