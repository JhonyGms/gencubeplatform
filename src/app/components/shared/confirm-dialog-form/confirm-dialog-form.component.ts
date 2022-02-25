import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AsambleasService } from '../../../services/asambleas.service';
@Component({
  selector: 'app-confirm-dialog-form',
  templateUrl: './confirm-dialog-form.component.html',
  styleUrls: ['./confirm-dialog-form.component.css'],
})
export class ConfirmDialogFormComponent implements OnInit {
  user = {
    nombres: '',
    apellidos: '',
    torre: '',
    apto: '',
    doc: '',
    correo: '',
    celular: '',
  };

  constructor(
    public formBuilder: FormBuilder,
    public Asambleaservices: AsambleasService,
    public dialogreff: MatDialogRef<ConfirmDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; text: string }
  ) {
    dialogreff.disableClose = true;
  }

  registerForm = this.formBuilder.group({
    nombres: ['', Validators.required],
    apellidos: [''],
    torre: ['', Validators.required],
    apto: [''],
    doc: ['', Validators.required],
    correo: ['', [Validators.required]],
    celular: ['', Validators.required],
  });

  ngOnInit(): void {}

  onClickNo(): void {
    this.dialogreff.close();
  }

  submit() {
    if (!this.registerForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }
    this.Asambleaservices.AlmacenarDatos(this.registerForm.value).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
