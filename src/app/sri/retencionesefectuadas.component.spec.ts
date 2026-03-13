import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetencionesEfectuadasComponent } from './retencionesefectuadas.component';

describe('RetencionesEfectuadasComponent', () => {
  let component: RetencionesEfectuadasComponent;
  let fixture: ComponentFixture<RetencionesEfectuadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetencionesEfectuadasComponent]
    });
    fixture = TestBed.createComponent(RetencionesEfectuadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
