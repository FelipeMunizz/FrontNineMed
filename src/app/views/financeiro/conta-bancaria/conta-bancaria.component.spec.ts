import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaBancariaComponent } from './conta-bancaria.component';

describe('ContaBancariaComponent', () => {
  let component: ContaBancariaComponent;
  let fixture: ComponentFixture<ContaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaBancariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
