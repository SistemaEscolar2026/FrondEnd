import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprassriContabilidadComponent } from './comprassricontabilidad.component';

describe('ComprassriContabilidadComponent', () => {
  let component: ComprassriContabilidadComponent;
  let fixture: ComponentFixture<ComprassriContabilidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComprassriContabilidadComponent]
    });
    fixture = TestBed.createComponent(ComprassriContabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
