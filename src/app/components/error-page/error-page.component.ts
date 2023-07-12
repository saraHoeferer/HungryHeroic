import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { StorageService } from 'src/app/services/storageService/storage.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
 constructor(private storageService: StorageService){}
 currentUser: any

 ngOnInit(): void {
   this.currentUser = this.storageService.getUser()
 }
}
