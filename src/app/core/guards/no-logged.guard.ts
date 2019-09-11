import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app-states';
import {User} from '../models/user';
import {AppConfig} from '../../config/app/app-config';

@Injectable({
  providedIn: 'root'
})
export class NoLoggedGuard implements CanActivate {
  constructor(private _LOCALSTORAGE: LocalStorageService,
              private store: Store<AppState>,
              private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authState = this._LOCALSTORAGE.parseItem<User>(AppConfig.user());
    if (!authState) {
      return true;
    } else {
      this.router.navigateByUrl('');
    }
  }
}
