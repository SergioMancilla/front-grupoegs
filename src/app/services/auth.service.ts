import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthUser, IUserData } from '../interfaces/IUser';

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

  public onLogin(user: IUserData) {
    const { id, email } = user;
    localStorage.setItem("user", JSON.stringify({id, email}))
  }

}
