import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconListComponent } from './beacon-list.component';

describe('BeaconListComponent', () => {
  let component: BeaconListComponent;
  let fixture: ComponentFixture<BeaconListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
