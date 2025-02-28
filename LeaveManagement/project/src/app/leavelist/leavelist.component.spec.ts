import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavelistComponent } from './leavelist.component';

describe('LeavelistComponent', () => {
  let component: LeavelistComponent;
  let fixture: ComponentFixture<LeavelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavelistComponent]
    });
    fixture = TestBed.createComponent(LeavelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
