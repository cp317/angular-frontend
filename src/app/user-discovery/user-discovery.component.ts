import { Component, OnInit } from '@angular/core';
declare let componentHandler: any; 

@Component({
  selector: 'app-user-discovery',
  templateUrl: './user-discovery.component.html',
  styleUrls: ['./user-discovery.component.css','./user-cards.component.css']
})
export class UserDiscoveryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
	ngAfterViewInit() {
    componentHandler.upgradeDom(); // upgrade all mdl components
  }
}
