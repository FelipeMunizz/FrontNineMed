import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoComponent } from './banco.component';

describe('BancoComponent', () => {
  let component: BancoComponent;
  let fixture: ComponentFixture<BancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
