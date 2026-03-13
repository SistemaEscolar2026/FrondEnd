import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadraturaIvaComponent } from './cuadraturaiva.component';

describe('CuadraturaIvaComponent', () => {
  let component: CuadraturaIvaComponent;
  let fixture: ComponentFixture<CuadraturaIvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuadraturaIvaComponent]
    });
    fixture = TestBed.createComponent(CuadraturaIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
