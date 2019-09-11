import {Injectable, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, take, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {LocalStorageService} from '../../../../core/local-storage/local-storage.service';
import {AuthService} from '../../../../core/authentication/auth.service';
import {
  DeleteMovie, DeleteMovieFailure, DeleteMovieSuccess,
  GetMovies,
  GetMoviesFailure,
  GetMoviesSuccess,
  MovieActionTypes,
  SaveMovie,
  SaveMovieFailure,
  SaveMovieSuccess
} from '../actions/movies.actions';
import {MoviesService} from '../../services/movies.service';

@Injectable()
export class MoviesEffectsService {

  constructor(
    private actions: Actions,
    private _MOVIES_SERVICE: MoviesService,
    private router: Router,
    private active: ActivatedRoute,
    private _SNACK: MatSnackBar,
    private _NGZONE: NgZone,
    private _LOCALSTORAGE: LocalStorageService
  ) {
  }

  @Effect()
  movieList: Observable<any> = this.actions
    .pipe(
      ofType(MovieActionTypes.GET_MOVIE),
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
                'Error al  tratat de recuperar las peliculas',
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
      map((action: DeleteMovie) => action),
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
