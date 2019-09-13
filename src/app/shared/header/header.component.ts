import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../core/store/app-states';
import {Observable} from 'rxjs';
import {State as AuthState} from '../../core/store/reducers/auth.reducers';
import {RoutingPath} from '../../config/routing/routing-path';
import {LogOut} from '../../core/store/actions/auth.actions';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'vt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sideNav: MatSidenav;
  @Input() hideHamburger = false;
  getState$: Observable<AuthState | any>;
  routeAdmin = RoutingPath.appRouting.modules.admin.path;
  routeLogin = RoutingPath.appRouting.modules.dashboard.pages.login.path;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.getState$ = this.store.select(selectAuthState)
       .pipe();
  }


  signOut() {
    this.store.dispatch(new LogOut());
  }


}
