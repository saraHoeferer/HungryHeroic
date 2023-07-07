import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IonicModule } from '@ionic/angular';
import { ItemListComponent } from './testDbSachen/item-list/item-list.component';
import { AddItemComponent } from './testDbSachen/add-item/add-item.component';
import { ItemDetailsComponent } from './testDbSachen/item-details/item-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { ProductDisplayShoppingComponent } from './components/product-display-shopping/product-display-shopping.component';
import { AccountComponent } from './components/account/account.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    ProductDisplayComponent,
    ItemListComponent,
    AddItemComponent,
    ItemDetailsComponent,
    RegisterComponent,
    ProductDisplayShoppingComponent,
    AccountComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
