import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AttendanceActions from '../../store/attendance.actions';
import * as AttendanceSelectors from '../../store/attendance.selectors';
import { Attendance } from '../../../../shared/models/attendance.model';

@Component({
  selector: 'app-attendance-component',
  standalone: false,
  templateUrl: './attendance-component.html',
  styleUrl: './attendance-component.scss',
})
export class AttendanceComponent {
  attendance$?: Observable<Attendance[]>;
  loading$?: Observable<boolean>;
  scanning = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.reloadAttendance();
  }

  reloadAttendance() {
    this.store.dispatch(AttendanceActions.loadTodayAttendance());
    this.attendance$ = this.store.select(
      AttendanceSelectors.selectTodayAttendance
    );
    this.loading$ = this.store.select(
      AttendanceSelectors.selectAttendanceLoading
    );
  }

  onQrScanned(result: string) {
    this.store.dispatch(AttendanceActions.processQrScan({ qrResult: result }));
    this.scanning = false;
  }
}
