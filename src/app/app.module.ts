import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { BeaconComponent } from './beacon/beacon.component';

@NgModule({
  declarations: [
    AppComponent,
    BeaconComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyC6ySrInpH3svhfDbZDIWc3dhHAOvZW2kk'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
