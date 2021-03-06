import { Pagination, PaginatedResult } from './../_models/pagination';
import { AlertifyService } from './../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
// import { PaginatedResult } from '../_models/pagination';
// import {
//   Pagination,
//   PaginatedResult,
// } from './../../../../DatingApp.API/Models/Pagination';
import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    // this.route.data.subscribe((data) => {
    //   console.log('fetching vaue from route = ' + data['users'].pagination);
    //   this.users = data['users'].result;
    //   this.pagination = data['users'].pagination;
    //   console.log('NgOninit = ' + this.pagination);
    // });
    this.route.data.subscribe((data) => {
      console.log('fetching vaue from route = ' + data['users'].pagination);
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }

  loadUsers() {
    console.log(this.pagination);
    this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        null,
        this.likesParam
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          console.log('Result= ' + res.result);
          console.log('Pagination= ' + res.pagination);
          this.users = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
}
