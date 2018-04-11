import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OogstkaartMapComponent } from './oogstkaart-map.component';

describe('OogstkaartMapComponent', () => {
  let component: OogstkaartMapComponent;
  let fixture: ComponentFixture<OogstkaartMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OogstkaartMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OogstkaartMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
