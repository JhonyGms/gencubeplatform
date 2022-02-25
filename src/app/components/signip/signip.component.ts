import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signip',
  templateUrl: './signip.component.html',
  styleUrls: ['./signip.component.css']
})
export class SignipComponent implements OnInit {


  user = {
    email: '',
    password: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  sigUp() {
    console.log(this.user)
  }
}
