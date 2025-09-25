import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import * as fromEmployee from '../../store/employee.selectors';
import { Employee } from '../../../../shared/models/employee.model';
import { EmployeeService } from '../../services/Employee/employee-service';

@Component({
  selector: 'app-employee-detail-component',
  standalone: false,
  templateUrl: './employee-detail-component.html',
  styleUrl: './employee-detail-component.scss',
})
export class EmployeeDetailComponent implements OnInit {
  employee$!: Observable<Employee>;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employee$ = this.route.paramMap.pipe(
      switchMap((params) => this.employeeService.getEmployee(params.get('id')!))
    );
    this.employee$.subscribe((res) => console.log(res));
  }
}
