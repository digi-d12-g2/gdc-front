import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerRttComponent } from './employer-rtt.component';

describe('EmployerRttComponent', () => {
  let component: EmployerRttComponent;
  let fixture: ComponentFixture<EmployerRttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerRttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerRttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
