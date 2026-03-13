import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportacionInformacionComponent } from './importainformacion.component';

describe('ImportacionInformacionComponent', () => {
  let component: ImportacionInformacionComponent;
  let fixture: ComponentFixture<ImportacionInformacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportacionInformacionComponent]
    });
    fixture = TestBed.createComponent(ImportacionInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
