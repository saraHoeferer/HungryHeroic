import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {AccountComponent} from "./components/account/account.component";
import { RecipesComponent } from './components/recipes/recipes/recipes.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

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
    path: 'start',
    component: HomeComponent,
    title: 'Start page'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register page'
  },
  {
    path: 'account',
    component: AccountComponent,
    title: 'Account page'
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    title: 'Recipe page'
  },
  {
    path: '**',
    component: ErrorPageComponent,
    title: 'Error page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
