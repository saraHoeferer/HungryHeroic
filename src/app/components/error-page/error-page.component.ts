import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { StorageService } from 'src/app/services/storageService/storage.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private appComponent: AppComponent
  ) { }

  // currentUser variable
  currentUser: any

  ngOnInit(): void {
    // get current User from Storage
    this.currentUser = this.storageService.getUser()
    // setIsHome false so the navigation bar is showing
    this.appComponent.setIsHome(false)
  }
}
