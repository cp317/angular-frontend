import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconSearchComponent } from './beacon-search.component';

describe('BeaconSearchComponent', () => {
  let component: BeaconSearchComponent;
  let fixture: ComponentFixture<BeaconSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
