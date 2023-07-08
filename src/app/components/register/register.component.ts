import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../app.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(private appComponent: AppComponent) {}

  ngOnInit() {
    this.appComponent.setIsHome(false)
  }
}
