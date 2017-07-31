import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconCreateComponent } from './beacon-create.component';

describe('BeaconCreateComponent', () => {
  let component: BeaconCreateComponent;
  let fixture: ComponentFixture<BeaconCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
