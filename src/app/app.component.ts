import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storageService/storage.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { EventBusService } from 'src/app/_shared/event-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hungryHeroic';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  user_name?: string;
  eventBusSub?: Subscription;
  public userId?: number;
  public isHomePage = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.user_name = user.user_name;
      this.userId = user.user_id;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.storageService.clean();
    window.location.href = '/';
  }

  setIsHome(value: boolean){
    this.isHomePage = value
  }

}