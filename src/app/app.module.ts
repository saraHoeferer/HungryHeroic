import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountComponent } from './components/account/account.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { MainComponent } from './components/main/main.component';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IonicModule } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDisplayShoppingComponent } from './components/product-display-shopping/product-display-shopping.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RecipesComponent } from './components/recipes/recipes/recipes.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MainComponent,
    ProductDisplayComponent,
    RegisterComponent,
    ProductDisplayShoppingComponent,
    AccountComponent,
    RecipesComponent,
    BoardUserComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot( {
        "backgroundPadding": 7,
        "radius": 150,
        "space": -5,
        "outerStrokeWidth": 5,
        "outerStrokeColor": "#E1F13E",
        "innerStrokeColor": "#e7e8ea",
        "innerStrokeWidth": 5,
        "animateTitle": true,
        "animationDuration": 1000,
        "showTitle": true,
        "titleFontSize": "22",
        "unitsFontSize": "22",
        "titleFontWeight": "bold",
        "unitsFontWeight": "bold",
        "showSubtitle": true,
        "subtitleFontSize": "18",
        "showUnits": true,
        "lazy": true
    }
    ),
    IonicModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
