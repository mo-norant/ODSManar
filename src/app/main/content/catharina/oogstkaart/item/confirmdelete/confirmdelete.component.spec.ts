import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdeleteComponent } from './confirmdelete.component';

describe('ConfirmdeleteComponent', () => {
  let component: ConfirmdeleteComponent;
  let fixture: ComponentFixture<ConfirmdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
