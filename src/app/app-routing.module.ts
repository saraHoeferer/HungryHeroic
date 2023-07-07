import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ItemListComponent } from './testDbSachen/item-list/item-list.component';
import { ItemDetailsComponent } from './testDbSachen/item-details/item-details.component';
import { AddItemComponent } from './testDbSachen/add-item/add-item.component';
import { RegisterComponent } from './components/register/register.component';
import {AccountComponent} from "./components/account/account.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent,
    title: 'Home page'
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Start page'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page'
  },
  /*{ path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: ItemListComponent },
  { path: 'tutorials/:id', component: ItemDetailsComponent },
  { path: 'add', component: AddItemComponent }*/
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register page'
  },
  {
    path: 'account',
    component: AccountComponent,
    title: 'Account page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
