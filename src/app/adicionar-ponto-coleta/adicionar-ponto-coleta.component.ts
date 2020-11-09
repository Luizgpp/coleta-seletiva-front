import { AgmMap, MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CidadesTable } from './../Models/CidadesTable';
import { ApiCidadeService } from './../services/api-cidade.service';
import { PontoColetaTable } from './../Models/PontosColetaTable';
import { ApiService } from './../services/api.service';
import { Component, ElementRef, NgZone, OnInit, ViewChild, ChangeDetectorRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgForm} from '@angular/forms';


@Component({
  selector: 'app-adicionar-ponto-coleta',
  templateUrl: './adicionar-ponto-coleta.component.html',
  styleUrls: ['./adicionar-ponto-coleta.component.css']
})
export class AdicionarPontoColetaComponent implements OnInit {
  @ViewChild('buscaElementRef') busca: ElementRef;

  pontoColeta = {} as PontoColetaTable;
  pontosDeColeta: PontoColetaTable[];

  cidadeModel = {} as CidadesTable;
  cidades: CidadesTable[];
  id: number;
  nome: string;
  endereco: string;
  latitude: number;
  longitude: number;
  cidade: string;
  estado: string;
  pais: string;
  form: NgForm;
  autocomplete: google.maps.places.Autocomplete;
  place: google.maps.places.PlaceResult;
  geoCoder: google.maps.Geocoder;



  @ViewChild('busca') public buscaElementRef: ElementRef;
  @ViewChild(AgmMap) map: HTMLElement;

  constructor(
    private apiCidadeService: ApiCidadeService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router
  ) {  }

 ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.setLocal();


    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder();

      this.autocomplete = new google.maps.places.Autocomplete(this.buscaElementRef.nativeElement);

      this.autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.place =  this.autocomplete.getPlace();

          if (this.place.geometry === undefined || this.place.geometry === null){
            return;
          }

          this.pontoColeta.latitude = this.place.geometry.location.lat();
          this.pontoColeta.longitude = this.place.geometry.location.lng();

        });
      });
    });
    if ( this.id  !== undefined){
      this.getCidade(this.id);
      this.getPontoColeta(this.id);
    }
  }


  setLocal(): any {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.pontoColeta.latitude = position.coords.latitude;
        this.pontoColeta.longitude = position.coords.longitude;
      });
    }
  }

  setMarcador(event: any): void{
    this.pontoColeta.latitude = event.coords.lat;
    this.pontoColeta.longitude = event.coords.lng;
    this.getEndereco(this.pontoColeta.latitude, this.pontoColeta.longitude);
  }

  getEndereco(latitude: any, longitude: any): any{
    this.geoCoder.geocode({location: {lat: latitude, lng: longitude}}, (result, status) => {
      if (status === 'OK'){
        this.pontoColeta.endereco = result[0].formatted_address;
        for (const item of result[0].address_components){
          if ( item.types[0] === 'administrative_area_level_2'){
            this.cidadeModel.nome = item.long_name;
          }
          if ( item.types[0] === 'administrative_area_level_1'){
            this.cidadeModel.uf = item.short_name;
          }
          if ( item.types[0] === 'country'){
            this.cidadeModel.pais = item.long_name;
          }
        }
      }else{
        window.alert('Falhou ao buscar endereco');
      }
    });
}

  onSubmit(): any{
    if (this.id === undefined){
      this.apiCidadeService.createCidade(this.cidadeModel).subscribe((dados: CidadesTable) => {
        this.pontoColeta.cidade_id = dados.id;
        this.apiService.createPontosColeta(this.pontoColeta).subscribe();
      });
      setTimeout(() => {
        this.router.navigateByUrl('lista-pontos-coleta');
      }, 300);


    }else if (this.id.valueOf()){
      this.apiService.updatePontosColeta(this.pontoColeta, this.id).subscribe();
      this.router.navigateByUrl('lista-pontos-coleta');
    }
  }

  getCidades(): any{
    this.apiCidadeService.getCidades().subscribe((dados: CidadesTable[]) => {
      this.cidades = dados;
    });
  }

  private getCidade(id: number): any{
    this.apiService.getCidadesByColetaId(id).subscribe((cidade: CidadesTable) => {
      this.cidadeModel = cidade;
    });
  }

  private getPontoColeta(id: number): any{
      this.apiService.getPontosColetaById(id).subscribe((ponto: PontoColetaTable) => {
        this.pontoColeta = ponto;
        this.latitude = ponto.latitude;
        this.longitude = ponto.longitude;
      });
  }
}
