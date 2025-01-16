import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtestadoReportComponent } from './atestado-report.component';

describe('AtestadoReportComponent', () => {
  let component: AtestadoReportComponent;
  let fixture: ComponentFixture<AtestadoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtestadoReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtestadoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
