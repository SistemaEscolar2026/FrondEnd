import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadraturaVentaContaFechaComponent } from './cuadraturaventacontafecha.component';

describe('CuadraturaVentaContaFechaComponent', () => {
  let component: CuadraturaVentaContaFechaComponent;
  let fixture: ComponentFixture<CuadraturaVentaContaFechaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadraturaVentaContaFechaComponent]
    });
    fixture = TestBed.createComponent(CuadraturaVentaContaFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
