import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';
import { AppComponent } from "../../app.component";

// This component binds form data (username, email, password) from template to
// AuthService.register() method that returns an Observable object.
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    user_name: null,
    user_mail: null,
    user_password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.appComponent.setIsHome(false)
  }

  //Form submission
  onSubmit(): void {
    const { user_name, user_mail, user_password } = this.form;
    this.authService.register(user_name, user_mail, user_password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
