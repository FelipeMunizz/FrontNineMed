import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcedimentoComponent } from './modal-atendimento.component';

describe('ModalProcedimentoComponent', () => {
  let component: ModalProcedimentoComponent;
  let fixture: ComponentFixture<ModalProcedimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProcedimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProcedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
