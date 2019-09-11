import {Injectable} from '@angular/core';
import {AuthService} from '../../core/authentication/auth.service';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, LogIn, LogInFailure, LogInSuccess, SignUp, SignUpFailure, SignUpSuccess} from '../actions/auth.actions';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable()
export class AuthEffectsService {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
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
              return new LogInSuccess(
                {
                  id: user.id,
                  email: payload.email,
                  isAdmin: user.isAdmin,
                  name: user.name,
                  password: user.password,
                  age: user.age
                }
              );
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

  @Effect({ dispatch: false })
  AuthFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE, AuthActionTypes.LOGIN_FAILURE)
  );
}
