import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneraXMLComponent } from './generaxml.component';

describe('GeneraXMLComponent', () => {
  let component: GeneraXMLComponent;
  let fixture: ComponentFixture<GeneraXMLComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneraXMLComponent]
    });
    fixture = TestBed.createComponent(GeneraXMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
