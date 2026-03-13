import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraSustentoComponent } from './comprasustento.component';

describe('CompraSustentoComponent', () => {
  let component: CompraSustentoComponent;
  let fixture: ComponentFixture<CompraSustentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompraSustentoComponent]
    });
    fixture = TestBed.createComponent(CompraSustentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
