import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogFormComponent } from '../../shared/confirm-dialog-form/confirm-dialog-form.component';
import { ConfirmDialogFormMovilComponent } from '../../shared/confirm-dialog-form-movil/confirm-dialog-form-movil.component';
import { gencubeUtils } from '../../../provider/utils/gencube-utils';

@Component({
  selector: 'app-uusuario',
  templateUrl: './uusuario.component.html',
  styleUrls: ['./uusuario.component.css'],
})
export class UusuarioComponent implements OnInit {

  imgfondo = '/assets/Logo_Horizontal_Gencube.png';

  user = {
    asamblea: '',
    username: '',
    password: '',
  };

  lista = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public gencubeUtils: gencubeUtils
  ) {}

  ngOnInit(): void {
    console.log(this.gencubeUtils.itsMovil())
    this.authService.listAsam().subscribe((res) => {
      this.lista = res;
    });
  }

  signIn() {
    if (this.user.asamblea == '') {
      const dialogref = this.dialog.open(ConfirmDialogComponent, {
        data: { title: `Porfavor seleccione una asamblea `, text: '' },
      });
      dialogref.afterClosed().subscribe((res) => {});
    } else {
      this.authService.signInUser(this.user).subscribe(
        (res) => {
          localStorage.setItem('tokenUser', res.token);
          localStorage.setItem('user', 'Usuario');
          this.formularioInicial();
          this.router.navigate(['/escritorio']);
        },
        (err) => {
          const dialogref = this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: 'Acceso no autorizado-' + err.error,
              text: 'Parece que los datos estan incorrectos, vuelve a intentar y verifica el USUARIO y CONTRASEÑA o el REGISTRO NO ESTA HABILITADO ',
            },
          });
          dialogref.afterClosed().subscribe((res) => {});
        }
      );
    }
  }

  changeWebsite(s) {
    if (this.user.asamblea == '') {
      this.imgfondo = '/assets/Logo_Horizontal_Gencube.png';
    } else {
      this.authService.signInUserLogo({ id: this.user.asamblea }).subscribe(
        (res) => {
          console.log();
          this.imgfondo = res[0].logo;
        },
        (err) => {}
      );
    }
  }
  formularioInicial() {
    this.authService.formularioInicial(this.user).subscribe(
      (res) => {
        console.log(res)
        if (res.estade == `true`) {
          if (this.gencubeUtils.itsMovil()) {
            const dialogref = this.dialog.open(ConfirmDialogFormMovilComponent, {
              data: { title: `Bienvenido ${this.user.username}`, text: '',logoConjunto: this.imgfondo },
            });
            dialogref.afterClosed().subscribe((res) => {});
          }else{
            const dialogref = this.dialog.open(ConfirmDialogFormComponent, {
              data: { title: `Bienvenido ${this.user.username}`, text: '',logoConjunto: this.imgfondo },
            });
            dialogref.afterClosed().subscribe((res) => {});
          }        
        } else {
          const dialogref = this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: `Bienvenido ${this.user.username}`,
              text: 'Este es tu apartado para la asamblea',
              logoConjunto: this.imgfondo
            },
          });
          dialogref.afterClosed().subscribe((res) => {});
        }
      },
      (err) => {}
    );
  }
}
