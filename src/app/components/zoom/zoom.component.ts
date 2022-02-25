import { Component, OnInit, Inject } from '@angular/core';
import { ZoomService } from "../../services/zoom.service";
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {

  user = {
    Nombres: '',
    Apellidos: '',
    Torre: '',
    Apartamento: '',
    Documento: '',
    signature: '',
    meetingNumber: ''
  }

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  signatureEndpoint = 'http://localhost:3000/api/signature'
  apiKey = 'IaY6hg6cQk2Dq0irRHjSGQ'
  meetingNumber = '7486552355'
  role = 0
  leaveUrl = 'http://localhost:4200'
  userName = 'Angular'
  userEmail = ''
  passWord = ''


  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) { }

  ngOnInit(): void {
  }



  getSignature() {
    this.httpClient.post(this.signatureEndpoint, {
      meetingNumber: this.meetingNumber,
      role: this.role
    }).toPromise().then((data: any) => {
      if (data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

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

}
// conect() {
  //   this.zoomService.getGenerateSignature()
  //   .subscribe( 
  //     res => {
  //       console.log(res[0].data)
  //       this.user = res;

  //        ZoomMtg.join({
  //         signature: res[0].data, 
  //         meetingNumber: 123456789,
  //         userName: 'hola',
  //         apiKey: '9DoAEDkZIrJ4i7yIZYJ6iZK4yW4y8jA3Eafb',
  //         userEmail: 'correo@test.co',
  //         passWord: 'password',
  //         success: (success) => {
  //           console.log(success)
  //         },
  //         error: (error) => {
  //           console.log(error)
  //         }
  //        })

  //     },
  //     err => console.log(err)
  //   )
  // }

