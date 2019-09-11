import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {ResponseRol} from '../models/response-rol';
import {AppConfig} from '../../config/app/app-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = AppConfig.BASE_URL();
  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<User[]> {
    const params = new HttpParams()
      .set('email', `${ email }`)
      .set('password',  `${ password }`);
    const url = `${this.BASE_URL}/users`;
    return this.http.get<User[]>(url, { params });
  }

  signUp(payload: User): Observable<User> {
    const url = `${this.BASE_URL}/users`;
    return this.http.post<User>(url, payload);
  }

  listRol(): Observable<ResponseRol[]> {
    const url = `${this.BASE_URL}/rol`;
    return this.http.get<ResponseRol[]>(url);
  }

}
