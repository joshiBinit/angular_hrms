import { TestBed } from '@angular/core/testing';

import { BaseFormBuilderService } from './base-form-builder-service';

describe('BaseFormBuilderService', () => {
  let service: BaseFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
