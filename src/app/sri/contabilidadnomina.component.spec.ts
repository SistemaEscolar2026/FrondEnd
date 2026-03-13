import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContabilidadNominaComponent } from './contabilidadnomina.component';

describe('ContabilidadNominaComponent', () => {
  let component: ContabilidadNominaComponent;
  let fixture: ComponentFixture<ContabilidadNominaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContabilidadNominaComponent]
    });
    fixture = TestBed.createComponent(ContabilidadNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
