import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoIvaComponent } from './gastoiva.component';

describe('GastoIvaComponent', () => {
  let component: GastoIvaComponent;
  let fixture: ComponentFixture<GastoIvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GastoIvaComponent]
    });
    fixture = TestBed.createComponent(GastoIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
