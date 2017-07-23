import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconCardsComponent } from './beacon-cards.component';

describe('BeaconCardsComponent', () => {
  let component: BeaconCardsComponent;
  let fixture: ComponentFixture<BeaconCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
