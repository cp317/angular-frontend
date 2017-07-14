import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconComponent } from './beacon.component';

describe('BeaconComponent', () => {
  let component: BeaconComponent;
  let fixture: ComponentFixture<BeaconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
