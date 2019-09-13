import {Injectable, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {LocalStorageService} from '../../../../core/local-storage/local-storage.service';
import {
  DeleteMyMovie, DeleteMovieFailure, DeleteMovieSuccess,
  GetMoviesFailure,
  GetMoviesSuccess, GetMyMoviesFailure, GetMyMoviesSuccess,
  MovieActionTypes,
  SaveMovie,
  SaveMovieFailure,
  SaveMovieSuccess, GetMyMovies
} from '../actions/movies.actions';
import {MoviesService} from '../../services/movies.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/store/app-states';
import {State as MovieState} from '../reducers/movies.reducers';

@Injectable()
export class MoviesEffectsService {

  constructor(
    private actions: Actions,
    private _MOVIES_SERVICE: MoviesService,
    private router: Router,
    private store: Store<MovieState>,
    private active: ActivatedRoute,
    private _SNACK: MatSnackBar,
    private _NGZONE: NgZone,
    private _LOCALSTORAGE: LocalStorageService
  ) {
  }

  @Effect()
  getMyMovies: Observable<any> = this.actions
    .pipe(
      ofType(MovieActionTypes.GET_MY_MOVIES),
      switchMap(payload => {
        return this._MOVIES_SERVICE.getMyMovieList()
          .pipe(
            map(myMovies => {
              return new GetMyMoviesSuccess(myMovies);
            }),
            catchError(err => {
              return of(new GetMyMoviesFailure());
            })
          );
      })
    );

  @Effect()
  movieList: Observable<any> = this.actions
    .pipe(
      ofType(MovieActionTypes.GET_MOVIES),
      switchMap(payload => {
        return this._MOVIES_SERVICE.getMovieList()
          .pipe(
            map((movie) => {
              if (movie.length > 0) {
                return new GetMoviesSuccess(
                  [...movie]
                );
              } else {
                this._SNACK.open(
                  'Error al  tratar de recuperar las peliculas',
                  'Ok',
                  {
                    duration: 6000
                  }
                );
                return new GetMoviesFailure();
              }
            }),
            catchError((error) => {
              this._SNACK.open(
                'Error al  tratat de recuperar las peliculas',
                'Ok',
                {
                  duration: 6000
                }
              );
              return of(new GetMoviesFailure());
            })
          );
      })
    );

  @Effect()
  saveMovie: Observable<any> = this.actions
    .pipe(
      ofType(MovieActionTypes.SAVE_MOVIE),
      map((action: SaveMovie) => action),
      switchMap(action => {
        return this._MOVIES_SERVICE.saveMovie(action.payload)
          .pipe(
            map((movie) => {
              this._SNACK.open(
                'Pelicula guardada corectamente en mis reservas',
                'Ok',
                {
                  duration: 6000
                }
              );
              return new SaveMovieSuccess(
                {
                  ...movie
                }
              );
            }),
            catchError((error) => {
              this._SNACK.open(
                'Error al  tratar de recuperar las peliculas',
                'Ok',
                {
                  duration: 6000
                }
              );
              return of(new SaveMovieFailure());
            })
          );
      })
    );

  @Effect()
  deleteMovie: Observable<any> = this.actions
    .pipe(
      ofType(MovieActionTypes.DELETE_MOVIE),
      map((action: DeleteMyMovie) => action),
      switchMap(action => {
        return this._MOVIES_SERVICE.removeMovie(action.id)
          .pipe(
            map((movie) => {
              this._SNACK.open(
                'Pelicula eliminada correctamente',
                'Ok',
                {
                  duration: 6000
                }
              );
              this.store.dispatch(new GetMyMovies());
              return new DeleteMovieSuccess();
            }),
            catchError((error) => {
              this._SNACK.open(
                'Error al tratar de eliminar pelicula',
                'Ok',
                {
                  duration: 6000
                }
              );
              return of(new DeleteMovieFailure());
            })
          );
      })
    );
}
