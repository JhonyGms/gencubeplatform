import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service'
import { MatDialog } from '@angular/material/dialog'
import {FormControl} from '@angular/forms';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component'
@Component({
  selector: 'app-votar',
  templateUrl: './votar.component.html',
  styleUrls: ['./votar.component.css']
})
export class VotarComponent implements OnInit {

  votaciones = [];

  result = { 
    name: '',
    resp: ''
  }

  multiple = false

  estado = false
  constructor(
    public dialog: MatDialog,
    public TaskServices: TaskService
  ) { } 

  ngOnInit(): void {
    this.buscarvotaciones()
  }

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  buscarvotaciones(){
    this.TaskServices.getDataInfoAsambleasVotaciones()
    .subscribe(res => {
      console.log(res)
      this.multiple = false
      this.votaciones = res
      try {
        if(res[0].multi == "1"){
          this.multiple = true
        }
      } catch (error) {
        console.log("vacio")
      }
      
      this.comprovarfull()
    }, err => {
      console.log(err)

    })
  }
  GuardarVotomulti(a){
    this.result.name = a
    this.result.resp = this.toppings.value
    console.log(this.toppings.value)
    if (this.toppings.value  == null) {
      const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"No Seleccionaste una Opcion ",text:""}})
      dialogref.afterClosed()
      .subscribe(res => {
        
      })
    } else {
      this.TaskServices.getDataInfoAsambleasVotacionmulti(this.result)
    .subscribe(res =>{
      console.log(res)
      const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"La votacion fue completada",text:""}})
      dialogref.afterClosed()
      .subscribe(res => {
        
      })
      this.buscarvotaciones()
    }, err =>{
      console.log(err)
    })
    }
  }

  GuardarVoto(a){
    this.result.name = a
    console.log(this.result)
    if (this.result.resp == '') {
      const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"No Seleccionaste una Opcion ",text:""}})
      dialogref.afterClosed()
      .subscribe(res => {
        
      })
    } else {
      this.TaskServices.getDataInfoAsambleasVotacion(this.result)
    .subscribe(res =>{
      console.log(res)
      const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"La votacion fue completada",text:""}})
      dialogref.afterClosed()
      .subscribe(res => {
        
      })
      this.buscarvotaciones()
    }, err =>{
      console.log(err)
    })
    }
    
  }

  comprovarfull(){
      if (this.votaciones[0] == undefined) {
        this.estado = false
      }else{
        this.estado = true
      }
  }

  actualizarvotacioness(){
    this.buscarvotaciones()
  }

}
