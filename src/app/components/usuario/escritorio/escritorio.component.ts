import { Component, OnInit, Inject} from '@angular/core';
import { TaskService } from '../../../services/task.service'
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ZoomMtg } from '@zoomus/websdk';
import { AsambleasService } from '../../../services/asambleas.service'
import {DomSanitizer} from '@angular/platform-browser';
import { ConfirmDialogFormComponent } from '../../shared/confirm-dialog-form/confirm-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-escritorio',
  templateUrl: './escritorio.component.html',
  styleUrls: ['./escritorio.component.css']
})
export class EscritorioComponent implements OnInit {

  id = {}

  idVotacion = [] 

  user = {
    asamblea: '',
    username: 'sas',
    password: '',
  };

  imagenes = {
    logoEpmresa: 'https://azulejo.tuasambleavirtual.com/img/scpaye%20rojo.png',
    logoConjunto: 'https://i.pinimg.com/564x/4c/f6/79/4cf679cb586f6ed6649e4a3123c6278d.jpg'
  } 

  tasks = {
    id: '',
    nombres: '',
    apellidos: '',
    torre: '',
    apartamento: '',
    documento: '',
    correo: '',
    numeroCelular: '',
    id_asamblea:'',
    id_user: ''
  }

  horaAsistida = ''

   signatureEndpoint = 'https://api.tuasambleavirtual.com/api/signature'
   apiKey = 'h21DjObdQp-do-Hr-f6esg'
   meetingNumber = '83579578701'
   role = 0
   leaveUrl = 'https://app.tuasambleavirtual.com/escritorio'
   userName = ''
   userEmail = ''
   passWord = ''
 
  constructor(
    public TaskServices: TaskService,
    public httpClient: HttpClient, 
    public AsambleasServices: AsambleasService,
    public sanitizer:DomSanitizer,
    public dialog: MatDialog,
    @Inject(DOCUMENT) document
  ) { }
 
  async ngOnInit() {
    const dialogref = this.dialog.open(ConfirmDialogFormComponent, {
      data: { title: `Bienvenido ${this.user.username}`, text: '' },
    });
    dialogref.afterClosed().subscribe((res) => {});
    this.inicio()
    this.getSignature()
  }

  inicio(){
    this.TaskServices.getDataInfoUser()
    .subscribe(res =>{
      console.log(res) 
      this.tasks = res['rows'][0]
      this.imagenes.logoEpmresa = res['rows2'][0].logo 
      this.imagenes.logoConjunto = res['rows1'][0].logo
      this.userName =res['rows'][0].id  +" "+ res['rows'][0].nombres  +" "+  res['rows'][0].apellidos  +" "+  res['rows'][0].torre +"-"+ res['rows'][0].apartamento
      this.meetingNumber = res['rows1'][0].idzoom
      console.log(this.meetingNumber)
      console.log("aqui")
    })

    this.TaskServices.getDataAsistenciaUser() 
    .subscribe(res => {
      console.log(res)
    })

    this.AsambleasServices.listvotacionesUserdos()
      .subscribe( 
        res => {
          this.idVotacion = res ;
          console.log(res)
        },   
        err => console.log(err)
      ) 
  }

 

  hora() {
    this.TaskServices.getDataAsistenciaUserTiem() 
    .subscribe(res => {
      
      this.horaAsistida = res.horaRegistro
    })
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

  getSignature() {
    this.httpClient.post(this.signatureEndpoint, {
      meetingNumber: this.meetingNumber,
      role: this.role
    }).toPromise().then((data: any) => {
      if (data.signature) {
        console.log(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'contents'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  actualizarvotaciones() {
    this.inicio() 
  }
}
