import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
