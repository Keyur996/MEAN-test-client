import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User | null;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    if(localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') || '') as User;
      this.isLoggedIn = true;
    }
   }

  logIn(emailAndPassword: any) {
    return this.http.post<User>('users/login', emailAndPassword);
  }

  saveInLocal(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.isLoggedIn = true;
  }

  logOut() {
    this.user = null;
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }
}
