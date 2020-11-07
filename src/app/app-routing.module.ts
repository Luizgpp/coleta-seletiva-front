import { AdicionarPontoColetaComponent } from './adicionar-ponto-coleta/adicionar-ponto-coleta.component';
import { ListaPontosColetaComponent } from './lista-pontos-coleta/lista-pontos-coleta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'lista-pontos-coleta', component: ListaPontosColetaComponent },
  {path: 'adicionar-ponto-coleta', component: AdicionarPontoColetaComponent},
  {path: 'edit-pontos-coleta/:id', component: AdicionarPontoColetaComponent},
  // {path: 'delete-pontos-coleta', component: PontoscoletaComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
