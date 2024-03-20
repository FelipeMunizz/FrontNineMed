import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoFinanceiraComponent } from './configuracao-financeira.component';

describe('ConfiguracaoFinanceiraComponent', () => {
  let component: ConfiguracaoFinanceiraComponent;
  let fixture: ComponentFixture<ConfiguracaoFinanceiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracaoFinanceiraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoFinanceiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
