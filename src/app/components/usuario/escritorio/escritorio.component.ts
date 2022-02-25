import { Component, OnInit, Inject} from '@angular/core';
import { TaskService } from '../../../services/task.service'
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ZoomMtg } from '@zoomus/websdk';
import { AsambleasService } from '../../../services/asambleas.service'
import {DomSanitizer} from '@angular/platform-browser';
import { ConfirmDialogFormComponent } from '../../shared/confirm-dialog-form/confirm-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../../services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-escritorio',
  templateUrl: './escritorio.component.html',
  styleUrls: ['./escritorio.component.css']
})
export class EscritorioComponent implements OnInit {

  id = {}

  idVotacion = [] 

  public movil: boolean = true;

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
   IdConjunto = ''
   userNameForm = ''

  constructor(
    private authService: AuthService,
    public TaskServices: TaskService,
    public httpClient: HttpClient, 
    public AsambleasServices: AsambleasService,
    public sanitizer:DomSanitizer,
    public dialog: MatDialog,
    public BreakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) document
  ) {
    this.movil = BreakpointObserver.isMatched('(max-width: 599px)');
   }
 
  async ngOnInit() {
    await this.inicio()
    await this.getSignature()
    
  }

  inicio(){
    this.TaskServices.getDataInfoUser()
    .subscribe(res =>{
      console.log(res)
      this.tasks = res['rows'][0]
      this.imagenes.logoEpmresa = res['rows2'][0].logo 
      this.imagenes.logoConjunto = res['rows1'][0].logo
      this.IdConjunto = res['rows1'][0].id
      this.userName =res['rows'][0].id  +" "+ res['rows'][0].nombres  +" "+  res['rows'][0].apellidos  +" "+  res['rows'][0].torre +"-"+ res['rows'][0].apartamento
      this.userNameForm =res['rows'][0].usuario
      this.meetingNumber = res['rows1'][0].idzoom
      //this.formularioInicial()
    })

    this.TaskServices.getDataAsistenciaUser() 
    .subscribe(res => {})

    this.AsambleasServices.listvotacionesUserdos()
      .subscribe( 
        res => {
          this.idVotacion = res ;
        },   
        ((error) => {})
      ) 
  }

  // formularioInicial() {
  //   let user = {
  //     asamblea: this.IdConjunto,
  //     username: this.userNameForm,
  //     password: this.passWord,
  //   };
  //   this.authService.formularioInicial(user).subscribe(
  //     (res) => {
  //       if (res.estade) {
  //         const dialogref = this.dialog.open(ConfirmDialogFormComponent, {
  //           data: { title: `Bienvenido ${this.userNameForm}`, text: '' , logoConjunto: this.imagenes.logoConjunto},
  //         });
  //         dialogref.afterClosed().subscribe((res) => {});
  //       } else {
  //         const dialogref = this.dialog.open(ConfirmDialogComponent, {
  //           data: {
  //             title: `Bienvenido ${this.userName}`,
  //             text: 'Este es tu apartado para la asamblea',
  //             logoConjunto: this.imagenes.logoConjunto
  //           },
  //         });
  //         dialogref.afterClosed().subscribe((res) => {});
  //       }
  //     },
  //     (err) => {}
  //   );
  // }

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
    }).catch((error) => {})
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'contents'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => { },
          error: (error) => {}
        })
      },
      error: (error) => { }
    })
  }


  actualizarvotaciones() {
    this.inicio() 
  }
}
