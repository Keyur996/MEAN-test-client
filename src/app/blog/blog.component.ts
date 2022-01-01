import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {AuthService} from '../auth/auth.service';
import {UsersService} from '../auth/users.service';
import {Blog} from '../models/blog.model';
import {User} from '../models/user.model';
import {BlogService} from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
  })
  blogs: Blog[] = [];
  users: any;

  constructor(private blogService: BlogService, private auth:AuthService, private userService: UsersService) { }

  ngOnInit() {
     this.getBlogs();
     this.getAllUsers();
  }

  saveBlog() {
    // console.log(this.blogForm);
    let blog = this.blogForm.value;
    blog.user = this.auth.user?._id || (JSON.parse(localStorage.getItem('user') || '') as User)._id;
    this.blogService.saveBlog(blog).subscribe({
      next: (_blog: Blog) => {
        // console.log(_blog);
        _blog.user = this.users[_blog.user];
        this.blogs.push(_blog);

      },
      error: (err: Error) => console.log(err),
      complete: () => {
        this.blogForm.reset();
      }
    })
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (_blogs) =>  {
        this.blogs = _blogs
      },
      error: (err) => console.log(err),
      // complete: () => console.log();
    })

    this.setUserInBlogs()
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = _.keyBy(users, "_id");
      },
      error: (err: Error) => {
        console.log(err);
      }, 
      complete: () => {
        this.setUserInBlogs();
      }
    })
  }

  setUserInBlogs() {
    _.forEach(this.blogs, (_blog) => {
      _blog.user = this.users[_blog.user];
    });
  }

}
