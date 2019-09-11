import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from './core/local-storage/local-storage.service';
import {Store} from '@ngrx/store';
import {AppState} from './core/store/app-states';
import {AppConfig} from './config/app/app-config';
import {LogIn} from './core/store/actions/auth.actions';
import {User} from './core/models/user';

@Component({
  selector: 'vt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _LOCALSTORAGE: LocalStorageService,
              private store: Store<AppState>) {
  }
  ngOnInit(): void {
    const authState = this._LOCALSTORAGE.parseItem<User>(AppConfig.user());
    if (authState) {
      this.store.dispatch(new LogIn({email: authState.email, password: authState.password}));
    }
  }

}
