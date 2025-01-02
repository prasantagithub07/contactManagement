import { HttpClient, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  httpHeaders: HttpHeaders;
  private apiUrl = `${environment.apiAddress}/Contact`;  // Assuming the backend API URL

  constructor(private httpClient: HttpClient) { 
    this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
  }

  getAll(): Observable<HttpResponse<Contact[]>> {
    return this.httpClient.get<Contact[]>(`${this.apiUrl}/getAll` , { headers: this.httpHeaders, observe: 'response' });
  }

  get(id: number): Observable<HttpResponse<Contact>> {
    return this.httpClient.get<Contact>(`${this.apiUrl}/get/${id}` , { headers: this.httpHeaders, observe: 'response' });
  }

  add(contact: Contact): Observable<HttpResponse<HttpResponse<any>>> {
    return this.httpClient.post<HttpResponse<any>>(`${this.apiUrl}/add`, JSON.stringify(contact), { headers: this.httpHeaders, observe: 'response' });
  }
  update(contact: Contact): Observable<HttpResponse<HttpResponse<any>>> {
    return this.httpClient.put<HttpResponse<any>>(`${this.apiUrl}/update/${contact.id}`, JSON.stringify(contact), { headers: this.httpHeaders, observe: 'response' });
  }
  delete(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<HttpResponse<any>>(`${this.apiUrl}/delete/${id}`, { headers: this.httpHeaders, observe: 'response' });
  }
}
