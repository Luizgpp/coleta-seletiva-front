import { ApiService } from './../services/api.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PontoColetaTable } from '../Models/PontosColetaTable';
import { Router } from '@angular/router';
import { AgmMap, MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-lista-pontos-coleta',
  templateUrl: './lista-pontos-coleta.component.html',
  styleUrls: ['./lista-pontos-coleta.component.css']
})
export class ListaPontosColetaComponent implements OnInit, AfterViewInit {
    pontoColeta = {} as PontoColetaTable;
    pontosDeColeta: PontoColetaTable[];

    latitude = -23.2639628;
    longitude = -47.3003345;

    constructor(
      private apiService: ApiService,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.getColetas();
  }

  ngAfterViewInit(): void {
    this.getColetas();
  }

  getColetas(): any{
    this.apiService.getPontosColeta().subscribe((dados: PontoColetaTable[]) => {
      this.pontosDeColeta = dados;
    });
  }

  editPontoColeta(dados: PontoColetaTable): any{
    this.pontoColeta = { ...dados};
    this.router.navigate(['edit-pontos-coleta/' + this.pontoColeta.id]);
  }

  deletePontoColeta(dados: PontoColetaTable): any{
    this.apiService.deletePontosColeta(dados).subscribe(() => {
      this.getColetas();
    });
  }

  onSubmit(nome: string): any{
    if (nome !== ''){
      this.apiService.getPontosColetaByName(nome).subscribe((dados: PontoColetaTable[]) => {
        this.pontosDeColeta = dados;
      });
    }else{
      this.getColetas();
    }
  }

}
