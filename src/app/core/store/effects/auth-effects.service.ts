import {Injectable, NgZone} from '@angular/core';
import {AuthService} from '../../authentication/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, LogIn, LogInFailure, LogInSuccess, SignUp, SignUpFailure, SignUpSuccess} from '../actions/auth.actions';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {AppConfig} from '../../../config/app/app-config';
import {LocalStorageService} from '../../local-storage/local-storage.service';

@Injectable()
export class AuthEffectsService {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private active: ActivatedRoute,
    private _SNACK: MatSnackBar,
    private _NGZONE: NgZone,
    private _LOCALSTORAGE: LocalStorageService
  ) {
  }

  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this.authService.login(payload.email, payload.password)
          .pipe(
            map((user) => {
              if (user.length > 0) {
                this._LOCALSTORAGE.stringifyItem(AppConfig.user(), user[0]);
                this.router.navigate([`''`], {relativeTo: this.active});
                return new LogInSuccess(
                  {
                    ...user[0]
                  }
                );
              } else {
                this._SNACK.open(
                  'Usuario contraseña inválidos',
                  'Ok',
                  {
                    duration: 6000
                  }
                );
                return new LogInFailure();
              }
            }),
            catchError((error) => {
              console.log(error);
              return of(new LogInFailure({error}));
            })
          );
      })
    );

  @Effect()
  SignUp: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.SIGNUP),
      map((action: SignUp) => action.payload),
      switchMap(payload => {
        return this.authService.signUp(payload)
          .pipe(
            map((user) => {
              console.log(user);
              return new SignUpSuccess({ ...user });
            }),
            catchError((error) => {
              console.log(error);
              return of(new SignUpFailure({error}));
            })
          );
      })
    );

  @Effect({dispatch: false})
  LogOut: Observable<any> = this.actions
    .pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(result => {
      this._LOCALSTORAGE.clear();
      this.router.navigateByUrl('/');
    }),
  );

  @Effect({ dispatch: false })
  AuthFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE, AuthActionTypes.LOGIN_FAILURE)
  );
}
