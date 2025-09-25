import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../../environment/environment';
import { ROUTES } from '../../../../core/constants/routes.consts';

const { LOGIN, SIGNUP } = ROUTES;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(userData: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${API_URL}/${SIGNUP}`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/${LOGIN}`, credentials);
  }
}
