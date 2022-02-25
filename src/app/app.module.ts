import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignipComponent } from './components/signip/signip.component';
import { SiginComponent } from './components/sigin/sigin.component';
import { TaskComponent } from './components/task/task.component';
import { PrivateTaskComponent } from './components/private-task/private-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UploadService } from './services/upload.service';


import { AuthGuard } from "./auth.guard";
import { AuthUserGuard } from "./auth-user.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { AlertComponent } from './components/alert/alert.component';
import { ZoomComponent } from './components/zoom/zoom.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { CrearAsambleaComponent } from './components/crear-asamblea/crear-asamblea.component';
import { AsambleasComponent } from './components/asambleas/asambleas.component';
import { UusuarioComponent } from './components/usuario/uusuario/uusuario.component';
import { EscritorioComponent } from './components/usuario/escritorio/escritorio.component';
import { GraficasComponent } from './components/usuario/graficas/graficas.component';
import { QuorumComponent } from './components/graficas/quorum/quorum.component';
import { CrearvotacionComponent } from './components/graficas/crearvotacion/crearvotacion.component';
import { VotacionesComponent } from './components/graficas/votaciones/votaciones.component';
import { DocumentosComponent } from './components/usuario/documentos/documentos.component';
import { VotarComponent } from './components/usuario/votar/votar.component';
import { VotacionesusuarioComponent } from './components/usuario/votacionesusuario/votacionesusuario.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ConfirmDialogFormComponent } from './components/shared/confirm-dialog-form/confirm-dialog-form.component';

@NgModule({
  declarations: [ 
    AppComponent,
    SignupComponent,
    SignipComponent,
    SiginComponent,
    TaskComponent,
    PrivateTaskComponent,
    AlertComponent,
    ZoomComponent,
    ConfirmDialogComponent,
    CrearAsambleaComponent,
    AsambleasComponent,
    UusuarioComponent,
    EscritorioComponent,
    GraficasComponent,
    QuorumComponent,
    CrearvotacionComponent,
    VotacionesComponent,
    DocumentosComponent,
    VotarComponent,
    VotacionesusuarioComponent,
    ConfirmDialogFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatSliderModule,
    ScrollingModule,
    ChartsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    PdfViewerModule
  ],
  entryComponents: [
    ConfirmDialogFormComponent,
    ConfirmDialogComponent
    
  ],
  providers: [
    AuthGuard,
    AuthUserGuard,
    UploadService,
    { 
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, 
      useValue: { 
        appearance: 'fill' 
      } 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
