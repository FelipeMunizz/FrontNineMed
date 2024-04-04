import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoAtendimentoComponent } from './auto-atendimento.component';

describe('AutoAtendimentoComponent', () => {
  let component: AutoAtendimentoComponent;
  let fixture: ComponentFixture<AutoAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoAtendimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
