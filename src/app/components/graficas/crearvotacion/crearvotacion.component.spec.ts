import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearvotacionComponent } from './crearvotacion.component';

describe('CrearvotacionComponent', () => {
  let component: CrearvotacionComponent;
  let fixture: ComponentFixture<CrearvotacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearvotacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearvotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
