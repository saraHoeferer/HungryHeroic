import { Component, OnInit} from '@angular/core';
import { AppComponent } from "../../app.component";
import { AuthService } from 'src/app/services/authService/auth.service';
import { StorageService } from 'src/app/services/storageService/storage.service';
// Login Component also uses AuthService to work with Observable object. Besides that,
// it calls StorageService methods to check loggedIn status and save User info to Session Storage.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    user_name: null,
    user_password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  user_name: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    // Check if the user is already logged in
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.user_name = this.storageService.getUser().user_name;
    }
    this.appComponent.setIsHome(false)
  }

  onSubmit(): void {
    const { user_name, user_password } = this.form;

    this.authService.login(user_name, user_password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  // Reload the page
  reloadPage(): void {
    window.location.reload();
  }
}