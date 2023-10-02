import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private url_base = "http://localhost:8000/api";

  constructor(private http: HttpClient) { }

  public getDocumentTypes(): Observable<any> {
    return this.http.get<any>(`${this.url_base}/document_types`)
  }
}
