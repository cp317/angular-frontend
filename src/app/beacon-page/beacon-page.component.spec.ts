import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconPageComponent } from './beacon-page.component';

describe('BeaconPageComponent', () => {
  let component: BeaconPageComponent;
  let fixture: ComponentFixture<BeaconPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
