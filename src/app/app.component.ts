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

  getIsHome(): boolean{
    return this.isHomePage
  }

  setIsHome(value: boolean){
    this.isHomePage = value
  }
}
