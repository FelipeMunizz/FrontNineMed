import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFinanceiroComponent } from './cadastro-financeiro.component';

describe('CadastroFinanceiroComponent', () => {
  let component: CadastroFinanceiroComponent;
  let fixture: ComponentFixture<CadastroFinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroFinanceiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
