import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-private-task',
  templateUrl: './private-task.component.html',
  styleUrls: ['./private-task.component.css']
})
export class PrivateTaskComponent implements OnInit {

  tasks = {
    id: 1,
    nombres: '',
    apellidos: '',
    correo: '',
    fechaNacimiento: '',
    logo: '',
    empresa: '',
    fechaCreacion: '',
    id_user: ''
  }

  asamblea = {
    id:'',
    nombre: '',
    fechaInicio: '',
    Participantes: '',
    idzoom: ''
  }
  asambleas = [

  ]
  constructor(public taskServices: TaskService, public AuthServices: AuthService) { }

  ngOnInit() : void{
    this.taskServices.getDataInfo()
    .subscribe( 
      res => {
        this.tasks = res ;
      },  
      err => console.log(err)
    ) 

    this.taskServices.getDataInfoAsamblea() 
    .subscribe( 
      res => {
        this.asamblea = res ; 
      },
      err => console.log(err)
    )

    this.taskServices.getDataInfoAsambleas()
    .subscribe( 
      res => {
        this.asambleas = res ;
      },
      err => console.log(err)
    )
  }

}
