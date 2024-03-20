import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaFinanceiraComponent } from './categoria-financeira.component';

describe('CategoriaFinanceiraComponent', () => {
  let component: CategoriaFinanceiraComponent;
  let fixture: ComponentFixture<CategoriaFinanceiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaFinanceiraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaFinanceiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
