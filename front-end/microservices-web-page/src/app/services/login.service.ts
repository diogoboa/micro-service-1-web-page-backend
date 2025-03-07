import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  obterToken(dados :any ): Observable<string> {
    const apiUrl = '/api/login'; // Substitua pela URL da sua API
    return this.http.post<string>(apiUrl, dados);
  }
}
