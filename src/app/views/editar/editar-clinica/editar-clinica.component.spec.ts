import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClinicaComponent } from './editar-clinica.component';

describe('EditarClinicaComponent', () => {
  let component: EditarClinicaComponent;
  let fixture: ComponentFixture<EditarClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarClinicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
