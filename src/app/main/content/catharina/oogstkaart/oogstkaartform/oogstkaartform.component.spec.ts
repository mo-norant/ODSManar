import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OogstkaartformComponent } from './oogstkaartform.component';

describe('OogstkaartformComponent', () => {
  let component: OogstkaartformComponent;
  let fixture: ComponentFixture<OogstkaartformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OogstkaartformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OogstkaartformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
