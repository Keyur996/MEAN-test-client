import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  saveUser(user: User) {
      return this.http.post<User>('users', user);
  }

  getAllUsers() {
    return this.http.get<User[]>('users');
  }
}