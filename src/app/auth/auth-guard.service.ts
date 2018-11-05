
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuth from './../auth/store/auth.reducer';
import { map, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromApp.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuth.State) => {
      return authState.authenticated;
    }));
  }
  // canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   return this.authService.isAuthenticated();
  // }
}
