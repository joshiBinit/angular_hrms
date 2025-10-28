import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../../../../shared/models/attendance.model';
import { API_URL } from '../../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  constructor(private http: HttpClient) {}

  getTodayAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${API_URL}/attendance/today`);
  }

  markAttendanceByQRCode(employeeId: string): Observable<any> {
    return this.http.post(`${API_URL}/attendance/mark`, { employeeId });
  }
}
