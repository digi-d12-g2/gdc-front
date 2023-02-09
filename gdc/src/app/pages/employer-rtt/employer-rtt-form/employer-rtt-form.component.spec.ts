import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerRttFormComponent } from './employer-rtt-form.component';

describe('EmployerRttFormComponent', () => {
  let component: EmployerRttFormComponent;
  let fixture: ComponentFixture<EmployerRttFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerRttFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerRttFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
