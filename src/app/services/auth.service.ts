import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAuthUser, IUserData } from '../interfaces/IUser';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url_base = "http://localhost:8000/api";

  constructor(private http: HttpClient, private userService: UserService) { }

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

  public logout() {
    localStorage.removeItem("user");
  }

  public isAuthenticatedUser(): boolean {
    const local_user = localStorage.getItem("user")
    if (!local_user) 
      return false

    const idUser = JSON.parse(local_user).id;
    if (!idUser) 
      return false

    return true;

  //   let user = null;

  //   this.userService.getUser(+idUser).subscribe(person=>{
  //     user = person;
  //   })

  //   if (!user)
  //     return of(false)

  //     return of(true);
  }

}
