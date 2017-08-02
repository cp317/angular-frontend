import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { WebAPI } from './web-api.service';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserDiscoveryComponent } from './user-discovery/user-discovery.component';
import { BeaconCardsComponent } from './beacon-cards/beacon-cards.component';
import { BeaconSearchComponent } from './beacon-search/beacon-search.component';
import { BeaconListComponent } from './beacon-list/beacon-list.component';
import { BeaconPageComponent } from './beacon-page/beacon-page.component';
import { RouterModule} from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfileComponent } from './profile/profile.component';
import { BeaconCreateComponent } from './beacon-create/beacon-create.component'
import {UserDiscoveryComponent} from './user-discovery/user-discovery.component';

export const firebaseConfig = {
  apiKey: "AIzaSyC6ySrInpH3svhfDbZDIWc3dhHAOvZW2kk",
  authDomain: "studygroupfinder-d172b.firebaseapp.com",
  databaseURL: "https://studygroupfinder-d172b.firebaseio.com",
  projectId: "studygroupfinder-d172b",
  storageBucket: "studygroupfinder-d172b.appspot.com",
  messagingSenderId: "390539351889"
};

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    UserDiscoveryComponent,
    BeaconCardsComponent,
    BeaconSearchComponent,
    BeaconListComponent,
    BeaconPageComponent,
    LoginComponent,
    RegisterComponent,
    LoginPageComponent,
    ProfileComponent,
    BeaconCreateComponent,
    UserDiscoveryComponent
  ],
  imports: [
    BrowserModule,
        RouterModule.forRoot([
        {path: '', component: MapComponent},
        {path: 'map', component: MapComponent},
        {path: 'user-discovery', component: UserDiscoveryComponent},
        {path: '*other', component: MapComponent}
    ]),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyC6ySrInpH3svhfDbZDIWc3dhHAOvZW2kk',
      libraries: ["places"]
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [WebAPI],
  bootstrap: [AppComponent]
})
export class AppModule { }
