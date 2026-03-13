import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReversaInformacionComponent } from './reversainformacion.component';

describe('ReversaInformacionComponent', () => {
  let component: ReversaInformacionComponent;
  let fixture: ComponentFixture<ReversaInformacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReversaInformacionComponent]
    });
    fixture = TestBed.createComponent(ReversaInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
