import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import {
  Resolve,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private altertify: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError((error) => {
        this.altertify.error('Problem retriving your Data');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
