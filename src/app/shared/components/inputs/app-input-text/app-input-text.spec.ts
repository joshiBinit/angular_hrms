import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputText } from './app-input-text';

describe('AppInputText', () => {
  let component: AppInputText;
  let fixture: ComponentFixture<AppInputText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppInputText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInputText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
