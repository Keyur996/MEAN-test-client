import { Component, Input, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {Blog} from 'src/app/models/blog.model';
import {BlogService} from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  @Input() blogs!: Blog[];
  displayedColumns: string[] = ['title', 'description', 'status', 'Name', 'Action'];
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
  }

  deleteBlog(blog: Blog) {
    this.blogService.deleteBlog(blog).subscribe({
      next: (res) => {
        this.removeFromBlogs(this.blogs, blog , '_id');
      } 
    });
  }

  removeFromBlogs(arr: any[], val: any, field: string) {
    let valIndex = arr.findIndex((_val: any) => _val[field] === val[field]);
    arr.splice(valIndex, 1);
  }
}
