import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  constructor(private http: HttpClient) { }

  enviarImagem(dados : any): Observable<any> {
    const authToken = sessionStorage.getItem('token');  // Recupera o token armazenado
    console.log('Token Recuperado: ', authToken); // Verificação do token

    if (!authToken) {
      console.error('Token não encontrado!'); // Se não houver token, exibe erro
      throw new Error('Token não encontrado!');
    }

    const apiUrlEnviar = '/api/imagens';
    // Verifica o conteúdo do `dados` e se está sendo enviado corretamente
    console.log('Dados a enviar: ', dados);
    
    // Agora faz a requisição normalmente
    let obj = this.http.post<any>(apiUrlEnviar, dados);
    console.log('Requisição feita: ', obj);
    
    return obj;
  }

  buscarImagem(chave: string): Observable<string> {
    const apiUrlBuscar = '/api/imagens';
    return this.http.get<string>(apiUrlBuscar + "/" + chave);
  }
}
