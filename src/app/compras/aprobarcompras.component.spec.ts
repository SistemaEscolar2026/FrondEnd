import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AprobarComprasComponent } from './aprobarcompras.component';

describe('AprobarComprasComponent', () => {
  let component: AprobarComprasComponent;
  let fixture: ComponentFixture<AprobarComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobarComprasComponent]
    });
    fixture = TestBed.createComponent(AprobarComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
