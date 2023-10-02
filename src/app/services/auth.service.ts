import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url_base = "http://localhost:8000/api";

  constructor(private http: HttpClient) { }

  public login(auth_user: IAuthUser): Observable<any> {
    return this.http.post<any>(`${this.url_base}/login`, {
      "user": auth_user['user'],
      "password": auth_user['password']
    })
  }

}
