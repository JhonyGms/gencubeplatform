import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsambleasComponent } from './asambleas.component';

describe('AsambleasComponent', () => {
  let component: AsambleasComponent;
  let fixture: ComponentFixture<AsambleasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsambleasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsambleasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
