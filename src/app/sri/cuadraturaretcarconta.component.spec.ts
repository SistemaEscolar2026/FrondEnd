import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadraturaRetencionesCarteraContabilidadComponent } from './cuadraturaretcarconta.component';

describe('CuadraturaRetencionesCarteraContabilidadComponent', () => {
  let component: CuadraturaRetencionesCarteraContabilidadComponent;
  let fixture: ComponentFixture<CuadraturaRetencionesCarteraContabilidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadraturaRetencionesCarteraContabilidadComponent]
    });
    fixture = TestBed.createComponent(CuadraturaRetencionesCarteraContabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
