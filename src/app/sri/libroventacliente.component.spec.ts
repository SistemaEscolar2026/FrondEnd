import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroVentaClienteComponent } from './libroventacliente.component';

describe('LibroVentaClienteComponent', () => {
  let component: LibroVentaClienteComponent;
  let fixture: ComponentFixture<LibroVentaClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibroVentaClienteComponent]
    });
    fixture = TestBed.createComponent(LibroVentaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
