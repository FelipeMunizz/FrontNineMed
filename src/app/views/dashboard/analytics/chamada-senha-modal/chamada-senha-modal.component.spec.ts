import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadaSenhaModalComponent } from './chamada-senha-modal.component';

describe('ChamadaSenhaModalComponent', () => {
  let component: ChamadaSenhaModalComponent;
  let fixture: ComponentFixture<ChamadaSenhaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamadaSenhaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadaSenhaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
