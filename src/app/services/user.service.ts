import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterPeople, IRegisterUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url_base = "http://localhost:8000/api";

  constructor(private http: HttpClient) { }

  public getAllUsers():Observable<any> {
    return this.http.get<any>(`${this.url_base}/users`);
  }

  public getUser(id_user: number):Observable<any> {
    return this.http.get<any>(`${this.url_base}/users/${id_user}`);
  }

  public filterUser(filter_object: IFilterPeople):Observable<any> {
    const { names, last_name, document_number, id_city } = filter_object;

    return this.http.get<any>(`${this.url_base}/users?
      last_name=${last_name}
      &names=${names}
      &document_number=${document_number}
      &id_city=${id_city}`
    );
  }

  public registerUser(register_user: IRegisterUser):Observable<any> {
    return this.http.post<any>(`${this.url_base}/users`, register_user);
  }

  public updateUser(id_user: number, new_user: IRegisterUser):Observable<any> {
    return this.http.put<any>(`${this.url_base}/users/${id_user}`, new_user);
  }

  public removeUser(id_user: number):Observable<any> {
    return this.http.delete<any>(`${this.url_base}/users/${id_user}`);
  }

}
