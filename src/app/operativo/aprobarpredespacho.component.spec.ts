import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AprobarPreDespachoComponent } from './aprobarpredespacho.component';

describe('AprobarPreDespachoComponent', () => {
  let component: AprobarPreDespachoComponent;
  let fixture: ComponentFixture<AprobarPreDespachoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarPreDespachoComponent]
    });
    fixture = TestBed.createComponent(AprobarPreDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
