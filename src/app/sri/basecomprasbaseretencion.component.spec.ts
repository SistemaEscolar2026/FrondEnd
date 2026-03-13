import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComprasBaseRetencionComponent } from './basecomprasbaseretencion.component';

describe('BaseComprasBaseRetencionComponent', () => {
  let component: BaseComprasBaseRetencionComponent;
  let fixture: ComponentFixture<BaseComprasBaseRetencionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseComprasBaseRetencionComponent]
    });
    fixture = TestBed.createComponent(BaseComprasBaseRetencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
