import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHolidayFormComponent } from './public-holiday-form.component';

describe('PublicHolidayFormComponent', () => {
  let component: PublicHolidayFormComponent;
  let fixture: ComponentFixture<PublicHolidayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicHolidayFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHolidayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
