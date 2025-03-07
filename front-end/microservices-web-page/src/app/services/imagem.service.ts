import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  constructor(private http: HttpClient) { }

  enviarImagem(dados : any): Observable<any> {
    const apiUrlEnviar = '/api/imagens';
    return this.http.post<any>(apiUrlEnviar, dados);
  }

  buscarImagem(chave: string): Observable<string> {
    const apiUrlBuscar = '/api/imagens';
    return this.http.get<string>(apiUrlBuscar + "/" + chave);
  }
}
