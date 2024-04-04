import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaChamadaComponent } from './lista-chamada.component';

describe('ListaChamadaComponent', () => {
  let component: ListaChamadaComponent;
  let fixture: ComponentFixture<ListaChamadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaChamadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaChamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
