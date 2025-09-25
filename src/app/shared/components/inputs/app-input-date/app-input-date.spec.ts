import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputDate } from './app-input-date';

describe('AppInputDate', () => {
  let component: AppInputDate;
  let fixture: ComponentFixture<AppInputDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppInputDate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInputDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
