import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hungryHeroic';

  public isHomePage = false;
  public userId = 1;

  setIsHome(value: boolean){
    this.isHomePage = value
  }
}
