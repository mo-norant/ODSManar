import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OogstkaartlistComponent } from './oogstkaartlist.component';

describe('OogstkaartlistComponent', () => {
  let component: OogstkaartlistComponent;
  let fixture: ComponentFixture<OogstkaartlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OogstkaartlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OogstkaartlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
