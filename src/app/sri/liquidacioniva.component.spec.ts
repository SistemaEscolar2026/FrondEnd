import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionIvaComponent } from './liquidacioniva.component';

describe('LiquidacionIvaComponent', () => {
  let component: LiquidacionIvaComponent;
  let fixture: ComponentFixture<LiquidacionIvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiquidacionIvaComponent]
    });
    fixture = TestBed.createComponent(LiquidacionIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
