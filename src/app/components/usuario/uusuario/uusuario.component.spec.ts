import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UusuarioComponent } from './uusuario.component';

describe('UusuarioComponent', () => {
  let component: UusuarioComponent;
  let fixture: ComponentFixture<UusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
