import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Logged in Successfully');
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
  loggedIn() {
    // const token = localStorage.getItem('token');
    // // check if value is present than reurn ture else return false
    // return !!token;
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged Out');
  }
}
