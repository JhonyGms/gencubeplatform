import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogFormMovilComponent } from './confirm-dialog-form-movil.component';

describe('ConfirmDialogFormMovilComponent', () => {
  let component: ConfirmDialogFormMovilComponent;
  let fixture: ComponentFixture<ConfirmDialogFormMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogFormMovilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogFormMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
