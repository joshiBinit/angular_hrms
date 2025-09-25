import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromEmployee from '../../store/employee.selectors';

@Component({
  selector: 'app-employee-detail-component',
  standalone: false,
  templateUrl: './employee-detail-component.html',
  styleUrl: './employee-detail-component.scss',
})
export class EmployeeDetailComponent implements OnInit {
  employeeId!: string;
  employee$: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.employee$ = this.store.select(
      fromEmployee.selectEmployeeById(this.employeeId)
    );
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
  }
}
