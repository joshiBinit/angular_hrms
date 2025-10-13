import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeFormService } from '../../services/EmployeeForm/employee-form-service';
import { Store } from '@ngrx/store';
import * as DepartmentActions from '../../../department/store/department.actions';
import * as DepartmentSelectors from '../../../department/store/department.selectors';
import { IncomeValidator } from '../../utils/income-validator';

type OptionType = { value: number | string; label: string };

@Component({
  selector: 'app-employee-form-component',
  standalone: false,
  templateUrl: './employee-form-component.html',
  styleUrl: './employee-form-component.scss',
})
export class EmployeeFormComponent implements OnInit {
  form?: FormGroup;
  isEdit = false;
  empId!: string | null;
  departmentOptions$;
  selectedFile: File | null = null;
  selectedImagePreview: string | null = null;
  fileError: string | null = null;

  readonly frequencyOptions: OptionType[] = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  readonly intervalOptions: OptionType[] = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Quarterly', label: 'Quarterly' },
    { value: 'Yearly', label: 'Yearly' },
  ];

  readonly FILE_CONFIG = {
    allowedTypes: ['image/jpeg', 'image/png'],
    maxSize: 1 * 1024 * 1024,
    errors: {
      type: 'Only JPEG and PNG files are allowed.',
      size: 'File size must be under 1 MB.',
    },
  };

  constructor(
    private employeeFormService: EmployeeFormService,
    private route: ActivatedRoute,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.departmentOptions$ = this.store.select(
      DepartmentSelectors.selectDepartmentOptions
    );
  }

  ngOnInit(): void {
    this.form = this.employeeFormService.buildEmployeeForm();
    this.store.dispatch(DepartmentActions.loadDepartments());
    this.empId = this.route.snapshot.paramMap.get('id');
    this.setupIncomeValueChanges();
  }

  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }

  getFormArray(arrayName: string): FormArray {
    return this.form?.get(arrayName) as FormArray;
  }

  getArrayControl(
    arrayName: string,
    index: number,
    controlName: string
  ): FormControl {
    return this.getFormArray(arrayName)
      .at(index)
      .get(controlName) as FormControl;
  }

  get profilePhoto(): FormControl {
    return this.getControl('profilePhoto');
  }

  get experiences(): FormArray {
    return this.getFormArray('experiences');
  }

  get incomes(): FormArray {
    return this.getFormArray('incomes');
  }

  getIncomeErrorMessage(index: number): string | null {
    const error = this.incomes.errors?.['invalidIncomeHierarchy'];

    if (error) {
      // Check if this index is the invalid one or the conflicting one
      if (error.invalidIndex === index) {
        return error.message;
      }

      // Optionally highlight the conflicting income too
      if (error.conflictingIndex === index) {
        return 'This income conflicts with another entry';
      }
    }

    return null;
  }

  private getSelectedValues<T>(
    arrayName: string,
    controlName: string,
    excludeIndex?: number
  ): T[] {
    const selected: T[] = [];
    this.getFormArray(arrayName).controls.forEach((control, index) => {
      if (index !== excludeIndex) {
        const value = control.get(controlName)?.value;
        if (value !== null && value !== undefined && value !== '') {
          selected.push(value);
        }
      }
    });
    return selected;
  }

  private getAvailableOptions<T extends number | string>(
    allOptions: OptionType[],
    selectedValues: T[]
  ): OptionType[] {
    return allOptions.filter(
      (option) => !selectedValues.includes(option.value as T)
    );
  }

  getAvailableFrequencyOptions(index: number): OptionType[] {
    const selectedFrequencies = this.getSelectedValues<number>(
      'incomes',
      'frequency',
      index
    );
    return this.getAvailableOptions(this.frequencyOptions, selectedFrequencies);
  }

  getAvailableIntervalOptions(index: number): OptionType[] {
    const selectedIntervals = this.getSelectedValues<string>(
      'incomes',
      'interval',
      index
    );
    return this.getAvailableOptions(this.intervalOptions, selectedIntervals);
  }

  private setupIncomeValueChanges(): void {
    this.incomes.valueChanges.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  private addFormArrayItem(
    arrayName: string,
    formBuilder: () => FormGroup
  ): void {
    const formGroup = formBuilder();
    this.getFormArray(arrayName).push(formGroup);

    if (arrayName === 'incomes') {
      this.setupIncomeValueChanges();
    }
  }

  private removeFormArrayItem(arrayName: string, index: number): void {
    this.getFormArray(arrayName).removeAt(index);
    this.cdr.detectChanges();
  }

  addExperience(): void {
    this.addFormArrayItem('experiences', () =>
      this.employeeFormService.buildExperienceForm()
    );
  }

  removeExperience(index: number): void {
    this.removeFormArrayItem('experiences', index);
  }

  addIncome(): void {
    this.addFormArrayItem('incomes', () =>
      this.employeeFormService.buildIncomeForm()
    );
  }

  removeIncome(index: number): void {
    this.removeFormArrayItem('incomes', index);
  }

  onFileSelected(files: FileList | null): void {
    if (!files) return;

    const file = files.item(0);
    if (!file) return;

    this.fileError = null;

    if (!this.FILE_CONFIG.allowedTypes.includes(file.type)) {
      this.fileError = this.FILE_CONFIG.errors.type;
      return;
    }

    if (file.size > this.FILE_CONFIG.maxSize) {
      this.fileError = this.FILE_CONFIG.errors.size;
      return;
    }

    this.selectedFile = file;
    this.profilePhoto.setValue(file);
  }

  onSubmit(): void {
    if (this.form?.valid) {
      this.employeeFormService.submitForm(this.form, this.selectedFile);
    } else {
      this.form?.markAllAsTouched();
    }
  }
}
