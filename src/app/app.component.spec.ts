import { TestBed, async } from '@angular/core/testing';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component : AppComponent
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));



 // checkEmail(email:string,callback)

  it('should return false if email does not already exists', async() => {
      component.checkEmail('afasfsafasf',function(a){
      expect(a).toBeFalsy();
    }); 
  })


  it('should return true if email does not already exists', async() => {
      component.checkEmail('MattMurdock96@gmail.com',function(a){
      expect(a).toBeTruthy();
    });    
  })


});
