import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoClinicaComponent } from './configuracao-clinica.component';

describe('ConfiguracaoClinicaComponent', () => {
  let component: ConfiguracaoClinicaComponent;
  let fixture: ComponentFixture<ConfiguracaoClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracaoClinicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
