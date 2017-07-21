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
import { AmgMapComponent } from './amg-map/amg-map.component';

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
    AmgMapComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyC6ySrInpH3svhfDbZDIWc3dhHAOvZW2kk',
      libraries: ["places"]
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WebAPI],
  bootstrap: [AppComponent]
})
export class AppModule { }
