import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { SignupComponent } from "./components/signup/signup.component";
import { SiginComponent } from "./components/sigin/sigin.component";
import { PrivateTaskComponent } from "./components/private-task/private-task.component";
import { TaskComponent } from "./components/task/task.component";
import { ZoomComponent } from "./components/zoom/zoom.component";
import { CrearAsambleaComponent } from './components/crear-asamblea/crear-asamblea.component';
import { AsambleasComponent } from './components/asambleas/asambleas.component';
import { UusuarioComponent } from './components/usuario/uusuario/uusuario.component'
import { EscritorioComponent } from './components/usuario/escritorio/escritorio.component'

import { AuthGuard } from "./auth.guard";
import { AuthUserGuard } from "./auth-user.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/usuario',
    pathMatch: 'full'
  },
  {
    path: 'task',
    component: TaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'administrador',
    component: PrivateTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'zoom',
    component: ZoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crear-cuenta',
    component: SignupComponent
  },
  {
    path: 'admin',
    component: SiginComponent
  },
  {
    path: 'crear-asamblea',
    component: CrearAsambleaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'asambleas/:id',
    component: AsambleasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario',
    component: UusuarioComponent
  },
  {
    path: 'escritorio',
    component: EscritorioComponent,
    canActivate: [AuthUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
