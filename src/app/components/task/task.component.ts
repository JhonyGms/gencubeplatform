import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks = []

  constructor(private taskServices: TaskService) { }

  ngOnInit() {
    this.taskServices.getTasks()
    .subscribe( 
      res => {
        console.log(res)
        this.tasks = res;
      },
      err => console.log(err)
    )
  }

}
