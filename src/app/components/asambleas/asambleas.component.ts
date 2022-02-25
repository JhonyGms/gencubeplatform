import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsambleasService } from '../../services/asambleas.service'
import { GraficasService } from '../../services/graficas.service'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-asambleas',
  templateUrl: './asambleas.component.html',
  styleUrls: ['./asambleas.component.css']
})
export class AsambleasComponent implements OnInit {

  listUser = [] 
  idVotacion = [] 

  estado = ''
  estadoQuorum = false

  id = {}

  up = {
    nombres: '',
    apellidos: '',
    torre: '',
    apartamento: '',
    documento: '',
    correo: '',
    numeroCelular: '',
    coefi: '',
    usuario: '',
    contrasena: ''

  }

  constructor(
    public ruta: ActivatedRoute,
    public AsambleasServices: AsambleasService,
    public GraficasServices: GraficasService ,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.ruta.params.subscribe(params =>{
      this.id = params
      this.AsambleasServices.listAsambleaUser(params)
      .subscribe( 
        res => {
          this.listUser = res ;
          console.log(res)
        },   
        err => console.log(err)
      ) 

      this.AsambleasServices.listvotacionesUser(params)
      .subscribe( 
        res => {
          this.idVotacion = res ;
          console.log(res)
        },   
        err => console.log(err)
      ) 

        this.estadoasa(params)
      
    })

  }

  estadoasa(data){
    this.AsambleasServices.Activaasamble(data)
    .subscribe(res =>{
      console.log(res[0].estado)
      if (res[0].estado.toString() == "Desactivada") {
        this.estadoQuorum = false
      } else {
        this.estadoQuorum = true
      }
    }, err => {
      console.log(err)
    })
  }

  actualizarvotaciones() {
   
      this.AsambleasServices.listvotacionesUser(this.id)
      .subscribe( 
        res => {
          this.idVotacion = res ;
          console.log(res)
        },   
        err => console.log(err)
      ) 
    
  }


  Desactivar(){
    this.AsambleasServices.Desactivarasamblea(this.id )
    .subscribe(res =>{
      console.log(res)
      
      this.estadoQuorum = false
      const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"El Registro de la Asamblea fue Desactivado",text:""}})
      dialogref.afterClosed()
      .subscribe(res => {
        
      })
    }, err => {
      console.log(err)
    })
  }

  activar(){
    this.AsambleasServices.Activarasamblea(this.id )
    .subscribe(res =>{
      console.log(res)
      
      this.estadoQuorum = true
      const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"El Registro de la Asamblea fue Activado",text:""}})
      dialogref.afterClosed()
      .subscribe(res => {
        
      })
    }, err => {
      console.log(err)
    })
  }

  eliminar() { 

  }
} 
