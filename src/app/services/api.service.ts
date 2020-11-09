import { CidadesTable } from './../Models/CidadesTable';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PontoColetaTable } from '../Models/PontosColetaTable';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private pontoColetaApiUrl =  'http://coleta-seletiva.test/api/Pontos-Coleta';


  constructor(private httpClient: HttpClient) { }
 // Headers
 httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Busca todos os pontos de coleta
  getPontosColeta(): Observable<PontoColetaTable[]>{
    return this.httpClient.get<PontoColetaTable[]>(this.pontoColetaApiUrl)
    .pipe(
      retry(2)
    );
  }
  // Busca um unico ponto de coleta
  getPontosColetaById(id: number): Observable<PontoColetaTable> {
    return this.httpClient.get<PontoColetaTable>(this.pontoColetaApiUrl + '/' + id)
      .pipe(
        retry(2)
      );
  }

  getCidadesByColetaId(id: number): Observable<CidadesTable> {
    return this.httpClient.get<CidadesTable>(this.pontoColetaApiUrl + '/' + id + '/cidade')
      .pipe(
        retry(2)
      );
  }

  createPontosColeta(pontoColeta: PontoColetaTable ): Observable<PontoColetaTable>{
    return this.httpClient.post<PontoColetaTable>(this.pontoColetaApiUrl, JSON.stringify(pontoColeta), this.httpOptions)
    .pipe(
      retry(2)
    );
  }

  updatePontosColeta(pontoColeta: PontoColetaTable, id: number): Observable<PontoColetaTable>{
    return this.httpClient.put<PontoColetaTable>(
      this.pontoColetaApiUrl + '/' + id, JSON.stringify(pontoColeta), this.httpOptions)
    .pipe(
      retry(2)
    );
  }

  deletePontosColeta(pontoColeta: PontoColetaTable): any {
    return this.httpClient.delete<PontoColetaTable>(this.pontoColetaApiUrl + '/' + pontoColeta.id, this.httpOptions)
      .pipe(
        retry(1)
      );
  }

  getPontosColetaByName(name: string): Observable<PontoColetaTable[]> {
    return this.httpClient.get<PontoColetaTable[]>(this.pontoColetaApiUrl + '/busca/' + name)
      .pipe(
        retry(2)
      );
  }

  // handleError(error: HttpErrorResponse): any {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

  // public sendGetRequest(): any{
  //   return this.httpClient.get(this.pontoColetaApiUrl).pipe(catchError(this.handleError));
  // }
}
