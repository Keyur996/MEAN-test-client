import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Blog} from "../models/blog.model";

@Injectable({
    providedIn: 'root'
  })
export class BlogService {
    blogsChanged: Subject<Blog[]> = new Subject(); 
    constructor(private http: HttpClient) {}

    saveBlog(blog: Blog) {
        return this.http.post<Blog>('blog', blog);
    }

    getBlogs() {
        return this.http.get<Blog[]>('blog');
    }

    deleteBlog(blog: Blog) {
        return this.http.delete<any>(`blog/${blog._id}`);
    }
}