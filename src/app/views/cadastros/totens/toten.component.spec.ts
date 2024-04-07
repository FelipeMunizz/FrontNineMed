import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotenComponent } from './toten.component';

describe('TotenComponent', () => {
  let component: TotenComponent;
  let fixture: ComponentFixture<TotenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
