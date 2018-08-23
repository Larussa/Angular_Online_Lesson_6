import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  brand: string = 'Routing';
  isToken: string;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.loginEvent.subscribe((data: string) => {
      this.isToken = data;
    });
  }

  onLogout() {
    this.auth.logout().subscribe((data: boolean) => {
      if (data)this.router.navigate(['/login']);
    },error => {
      console.log(error.status);
    });
  }
}
