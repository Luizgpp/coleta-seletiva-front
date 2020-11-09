import { CidadesTable } from './../Models/CidadesTable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCidadeService {
  private cidadeApiUrl =  'http://coleta-seletiva.test/api/Cidades';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

    // Busca todos os pontos de coleta da cidade
    getCidades(): Observable<CidadesTable[]>{
      return this.httpClient.get<CidadesTable[]>(this.cidadeApiUrl)
      .pipe(
        retry(2)
      );
    }

  // Busca cidade pelo id do potno de coleta
  getCidadeById(id: number): Observable<CidadesTable> {
    return this.httpClient.get<CidadesTable>(this.cidadeApiUrl + '/' + id)
      .pipe(
        retry(2)
      );
  }

  createCidade(cidade: CidadesTable ): Observable<CidadesTable>{
    return this.httpClient.post<CidadesTable>(this.cidadeApiUrl, JSON.stringify(cidade), this.httpOptions)
    .pipe(
      retry(2)
    );
  }


}
