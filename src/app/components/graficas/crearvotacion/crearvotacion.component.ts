import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GraficasService } from '../../../services/graficas.service'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-crearvotacion',
  templateUrl: './crearvotacion.component.html',
  styleUrls: ['./crearvotacion.component.css']
})
export class CrearvotacionComponent implements OnInit {

    @Input() id = {}
  
  user = {
    username: '',
    password: ''
  }

  get telefonos(){
    return this.registerForm.get('telefonos') as FormArray;
  }

  constructor(
    public formBuilder: FormBuilder,
    public GraficasServices: GraficasService ,
    public dialog: MatDialog
    ) {
      
     }

     registerForm = this.formBuilder.group({
       id: [''],
      nombre: ['', Validators.required],
      diferentesOpciones: [false],
      telefonos: this.formBuilder.array([])

    })
    
  ngOnInit(): void {
  }

  agregarTelefono(){
    const telefonoFormGroup  = this.formBuilder.group({
      telefono: ''
    });
    this.telefonos.push(telefonoFormGroup);
  }

  removerTelefono(indice: number) {
    this.telefonos.removeAt(indice);
  }

  enviar(value){
    console.log(value)
  }

  submit() {

    if (!this.registerForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }
    this.registerForm.patchValue({
      id: this.id['id']
    });
    this.GraficasServices.qcrearvotacion(this.registerForm.value)
    .subscribe(res => {
      const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"Todo salio perfecto",text:"Se ha podido crear la votacion de forma satisfactoria"}})
      dialogref.afterClosed()
      .subscribe(res => {
        
      })
    },
    err => {
      const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"Paso algo",text:"No se ha podido crear la votacion de forma satisfactoria"}})
      dialogref.afterClosed()
      .subscribe(res => {
        
      })
    })
    console.log(this.registerForm.value);
  }

  refrescar() {
    this.registerForm.patchValue({
      nombre: '',
      diferentesOpciones: false
    });
    this.telefonos.controls.splice(0, this.telefonos.length);
  }
} 
