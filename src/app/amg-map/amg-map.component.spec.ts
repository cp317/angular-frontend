import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmgMapComponent } from './amg-map.component';

describe('AmgMapComponent', () => {
  let component: AmgMapComponent;
  let fixture: ComponentFixture<AmgMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmgMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmgMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
