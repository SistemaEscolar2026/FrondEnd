import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadraturaComprasSriContabilidadComponent } from './cuadraturacomprasriconta.component';

describe('CuadraturaComprasSriContabilidadComponent', () => {
  let component: CuadraturaComprasSriContabilidadComponent;
  let fixture: ComponentFixture<CuadraturaComprasSriContabilidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadraturaComprasSriContabilidadComponent]
    });
    fixture = TestBed.createComponent(CuadraturaComprasSriContabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
