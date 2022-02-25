import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service'

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  
  src = [];

  constructor(
    public TaskServices:TaskService
  ) { }

  ngOnInit(): void {
    this.TaskServices.getDataInfoAsambleasDocument()
    .subscribe(res =>{
      console.log(res[0][1])
      for (let index = 0; index < res.length; index++) {
        this.src.push(res[index][1])
        
      }
      console.log(this.src)
    }, err =>{
      console.log(err)
    })
    console.log(this.src)
  }

}
