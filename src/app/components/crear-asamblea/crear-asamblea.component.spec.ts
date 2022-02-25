import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsambleaComponent } from './crear-asamblea.component';

describe('CrearAsambleaComponent', () => {
  let component: CrearAsambleaComponent;
  let fixture: ComponentFixture<CrearAsambleaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAsambleaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAsambleaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
