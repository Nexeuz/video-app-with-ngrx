import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../store/app-states';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import {State as AuthState} from '../../store/reducers/auth.reducers';

@Component({
  selector: 'vt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  getState$: Observable<AuthState | any>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.getState$ = this.store.select(selectAuthState)
       .pipe(
       );
  }

}
