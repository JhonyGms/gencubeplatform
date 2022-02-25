import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogFormComponent } from './confirm-dialog-form.component';

describe('ConfirmDialogFormComponent', () => {
  let component: ConfirmDialogFormComponent;
  let fixture: ComponentFixture<ConfirmDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
