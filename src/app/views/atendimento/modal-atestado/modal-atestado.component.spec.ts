import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtestadoComponent } from './modal-atestado.component';

describe('ModalAtestadoComponent', () => {
  let component: ModalAtestadoComponent;
  let fixture: ComponentFixture<ModalAtestadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAtestadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAtestadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
