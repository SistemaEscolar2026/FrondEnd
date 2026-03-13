import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadraturaVentasSriContabilidadComponent } from './cuadraturaventasriconta.component';

describe('CuadraturaVentasSriContabilidadComponent', () => {
  let component: CuadraturaVentasSriContabilidadComponent;
  let fixture: ComponentFixture<CuadraturaVentasSriContabilidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadraturaVentasSriContabilidadComponent]
    });
    fixture = TestBed.createComponent(CuadraturaVentasSriContabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
