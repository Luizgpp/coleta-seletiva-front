import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPontoColetaComponent } from './adicionar-ponto-coleta.component';

describe('AdicionarPontoColetaComponent', () => {
  let component: AdicionarPontoColetaComponent;
  let fixture: ComponentFixture<AdicionarPontoColetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarPontoColetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarPontoColetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
