import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenioComponent } from './convenio.component';

describe('ConvenioComponent', () => {
  let component: ConvenioComponent;
  let fixture: ComponentFixture<ConvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvenioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
