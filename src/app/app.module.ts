import { NgModule } from '@angular/core';
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
import { ListsComponent } from './components/Lists/lists/lists.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ProductDisplayShoppingComponent } from './components/product-display-shopping/product-display-shopping.component';

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
    ListsComponent,
    ShoppingListComponent,
    ProductDisplayShoppingComponent,
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
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
