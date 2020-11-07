import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPontosColetaComponent } from './lista-pontos-coleta.component';

describe('ListaPontosColetaComponent', () => {
  let component: ListaPontosColetaComponent;
  let fixture: ComponentFixture<ListaPontosColetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPontosColetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPontosColetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
