import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCuentaCXPComponent } from './estadocuentacxp.component';

describe('EstadoCuentaCXPComponent', () => {
  let component: EstadoCuentaCXPComponent;
  let fixture: ComponentFixture<EstadoCuentaCXPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadoCuentaCXPComponent]
    });
    fixture = TestBed.createComponent(EstadoCuentaCXPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
