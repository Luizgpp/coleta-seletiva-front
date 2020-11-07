import { ActivatedRoute, Router } from '@angular/router';
import { CidadesTable } from './../Models/CidadesTable';
import { ApiCidadeService } from './../services/api-cidade.service';
import { PontoColetaTable } from './../Models/PontosColetaTable';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-adicionar-ponto-coleta',
  templateUrl: './adicionar-ponto-coleta.component.html',
  styleUrls: ['./adicionar-ponto-coleta.component.css']
})
export class AdicionarPontoColetaComponent implements OnInit {

  formAddPontoColeta = new FormGroup({
    nome: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required),
    cidade_id: new FormControl('', Validators.required),
  });

  pontoColeta = {} as PontoColetaTable;
  cidades: CidadesTable[];
  id: number;

  constructor(
    private apiService: ApiService,
    private apiCidadeService: ApiCidadeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getCidades();

    if (this.id !== undefined) {
      this.apiService.getPontosColetaById(this.id)
          .pipe(first())
          .subscribe(x => this.formAddPontoColeta.patchValue(x));
    }
  }


  adicionarPontosColeta(): any{
    if (this.id === undefined){
      this.pontoColeta = this.formAddPontoColeta.getRawValue();
      this.apiService.createPontosColeta(this.pontoColeta).subscribe();
      this.router.navigateByUrl('lista-pontos-coleta');
    }else if (this.id.valueOf()){
      this.pontoColeta = this.formAddPontoColeta.getRawValue();
      this.apiService.updatePontosColeta(this.pontoColeta, this.id).subscribe();
      this.router.navigateByUrl('lista-pontos-coleta');
    }
  }


  getCidades(): any{
    this.apiCidadeService.getCidades().subscribe((dados: CidadesTable[]) => {
      this.cidades = dados;
    });
  }
}
