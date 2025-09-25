import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputFile } from './app-input-file';

describe('AppInputFile', () => {
  let component: AppInputFile;
  let fixture: ComponentFixture<AppInputFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppInputFile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInputFile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
