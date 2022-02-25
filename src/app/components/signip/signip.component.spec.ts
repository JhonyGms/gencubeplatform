import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignipComponent } from './signip.component';

describe('SignipComponent', () => {
  let component: SignipComponent;
  let fixture: ComponentFixture<SignipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
