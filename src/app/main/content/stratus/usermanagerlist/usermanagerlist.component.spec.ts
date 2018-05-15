import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagerlistComponent } from './usermanagerlist.component';

describe('UsermanagerlistComponent', () => {
  let component: UsermanagerlistComponent;
  let fixture: ComponentFixture<UsermanagerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermanagerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermanagerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
