import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputNumber } from './app-input-number';

describe('AppInputNumber', () => {
  let component: AppInputNumber;
  let fixture: ComponentFixture<AppInputNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppInputNumber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInputNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
