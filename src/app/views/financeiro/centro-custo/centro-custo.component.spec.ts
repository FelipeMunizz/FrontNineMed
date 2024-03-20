import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCustoComponent } from './centro-custo.component';

describe('CentroCustoComponent', () => {
  let component: CentroCustoComponent;
  let fixture: ComponentFixture<CentroCustoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroCustoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentroCustoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
