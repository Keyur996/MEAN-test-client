import {HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/models/user.model';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm!: FormGroup;
  errorMessage: string = '';
  user!: User;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  logIn() {
    this.auth.logIn(this.logInForm.value).subscribe({
      next: (user) => {
        this.user = user;
        console.log("user", user);
      },
      error: (err: HttpErrorResponse) => { 
        console.log(err)
        if(err.error?.error) {
          this.errorMessage= err.error?.error;
        }
      },
      complete: () => {
        this.auth.saveInLocal(this.user);
        this.router.navigate(['/blogs'], { relativeTo: this.route });
      }
    })
  }

}
