import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service'
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-crear-asamblea',
  templateUrl: './crear-asamblea.component.html',
  styleUrls: ['./crear-asamblea.component.css']
})
export class CrearAsambleaComponent implements OnInit {

  uploadFiles: Array <File>;

  asamblea = {
    nombre:'',
    fechaInicio:'',
    cantidad:'',
    idzoom:'',
    nameDoc: {}
  }
 
  constructor( 
    public UploadServices: UploadService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  

  onUpload() {
    let formData = new FormData();
    for (let index = 0; index < this.uploadFiles.length; index++) {
      formData.append("upload[]", this.uploadFiles[index], this.uploadFiles[index].name )
    }
    console.log( "1")
    this.UploadServices.uploadfiles(formData)
    .subscribe((res) =>{
      console.log(res)
      this.asamblea.nameDoc = res
      this.UploadServices.uploadfilesAsamblea(this.asamblea)
      .subscribe((res2) =>{
        const dialogref = this.dialog.open(ConfirmDialogComponent,{data:{title:"Creado con exito la Asamblea",text:"Todo ok "}})
        dialogref.afterClosed()
        .subscribe(res => {
          console.log(res)
        })
        this.router.navigate(['/administrador'])
        console.log(res2)
      })
      
    })


  }

  onFileChange(e) {
    this.uploadFiles = e.target.files
    
  }
}
