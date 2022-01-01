import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm!: FormGroup; 

  constructor(private userService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [ Validators.required, Validators.email]),
      birthdate: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    })
  }

  saveUser() {
    console.log("User", this.userForm);
    this.userService.saveUser(this.userForm.value).subscribe({
      next: () => {
        this.router.navigate(['/login'], { relativeTo: this.route})
      },
      error: (err: Error) => console.log(err),
      complete: () => this.userForm.reset()
    })
  }

}
