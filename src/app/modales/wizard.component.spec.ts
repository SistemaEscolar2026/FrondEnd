import { ComponentFixture, TestBed } from '@angular/core/testing';
import { wizardComponent } from './wizard.component';

describe('wizardComponent', () => {
    let component: wizardComponent;
    let fixture: ComponentFixture<wizardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [wizardComponent]
    });
      fixture = TestBed.createComponent(wizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
