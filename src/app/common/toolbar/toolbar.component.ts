import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.auth.logOut();
    this.router.navigate(['/'], { relativeTo: this.route })
  }

}
