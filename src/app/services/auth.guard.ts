import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}
  canLoad(route: Route) {
    return this.auth.isAuth().pipe(
      tap((status) => {
        if (!status) this.router.navigate(['/login']);
      }, take(1))
    );
  }
}
