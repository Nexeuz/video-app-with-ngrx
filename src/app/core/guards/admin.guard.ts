import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../store/app-states';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _LOCALSTORAGE: LocalStorageService,
              private store: Store<AppState>,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectAuthState)
      .pipe(
        map(result => {
            if (result ? (result.user ? result.user.isAdmin : false) : false) {
              return true;
            } else {
              this.router.navigateByUrl('/');
              return  false;
            }
        })
      );
  }

}
