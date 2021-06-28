import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSugerenciaComponent } from './nueva-sugerencia.component';

describe('NuevaSugerenciaComponent', () => {
  let component: NuevaSugerenciaComponent;
  let fixture: ComponentFixture<NuevaSugerenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaSugerenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaSugerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});