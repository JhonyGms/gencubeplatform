import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component' 

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit { 

  user = {
    username: '',
    password: ''
  }

  constructor(
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void { 
  }

  signIn(){
    this.authService.signIn(this.user)
    .subscribe(
      res => {
        
        localStorage.setItem('token', res.token )
        localStorage.setItem('user', "AdministradordeAsambleas" )
        this.router.navigate(['/administrador'])
      },
      err => {
        console.log(err)
        const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"Acceso no autorizado",text:"Parece que los datos estan incorrectos, vuelve a intentar y verifica el USUARIO y CONTRASEÑA"}})
        dialogref.afterClosed()
        .subscribe(res => {
          
        })
      }
    )
  }

  openDialog():void{
    const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"Axceso no autorizado",text:"Parece que los Datos estan Incorrectos"}})
    dialogref.afterClosed()
    .subscribe(res => {
      console.log(res)
    })
  }

}
