import { ApiService } from './../services/api.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PontoColetaTable } from '../Models/PontosColetaTable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-pontos-coleta',
  templateUrl: './lista-pontos-coleta.component.html',
  styleUrls: ['./lista-pontos-coleta.component.css']
})
export class ListaPontosColetaComponent implements OnInit, AfterViewInit {
    pontoColeta = {} as PontoColetaTable;
    pontosDeColeta: PontoColetaTable[];

    constructor(private apiService: ApiService, private router: Router ) { }

  ngOnInit(): void {
    this.getColetas();
    console.log('passou OnInit');
  }

  ngAfterViewInit(): void {
    this.getColetas();
    console.log('passou After View Init');
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
      console.log('passou detete');
    });
  }

}
