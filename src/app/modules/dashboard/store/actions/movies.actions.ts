import {Action} from '@ngrx/store';
import {Movie} from '../../../../core/models/movie';


export enum MovieActionTypes {
  GET_MOVIE = '[Movie] GET movies from backend',
  GET_MOVIE_SUCCESS = '[Movie] Successful retrieve movies',
  GET_MOVIE_FAILURE = '[Movie] error trying retrieve movies',
  GET_SEARCH_MOVIE = '[Movie] error trying retrieve movies',
  SAVE_MOVIE  = '[Movie] try reserve movie',
  SAVE_MOVIE_SUCCESS  = '[Movie] Successful saved movies',
  SAVE_MOVIE_FAILURE = '[Movie] error trying retrieve movies',
  DELETE_MOVIE  = '[Movie] try delete movie',
  DELETE_MOVIE_SUCCESS  = '[Movie] Successful deleted movie',
  DELETE_MOVIE_FAILURE = '[Movie] error trying deleting movie',
}

export class GetMovies implements Action {
  readonly type = MovieActionTypes.GET_MOVIE;
}


export class GetMoviesSuccess implements Action {
  readonly type = MovieActionTypes.GET_MOVIE_SUCCESS;
  constructor(public payload: Movie[]) {}
}

export class GetMoviesFailure implements Action {
  readonly type = MovieActionTypes.GET_MOVIE_FAILURE;
}


export class SaveMovie implements Action {
  readonly type = MovieActionTypes.SAVE_MOVIE;
  constructor(public payload: Movie) {

  }}

export class SaveMovieSuccess implements Action {
  readonly type = MovieActionTypes.SAVE_MOVIE_SUCCESS;
  constructor(public payload: Movie) {}

}

export class SaveMovieFailure implements Action {
  readonly type = MovieActionTypes.SAVE_MOVIE_FAILURE;
}


export class DeleteMovie implements Action {
  readonly type = MovieActionTypes.DELETE_MOVIE;
  constructor(public id: number) {
  }
}

export class DeleteMovieSuccess implements Action {
  readonly type = MovieActionTypes.DELETE_MOVIE_SUCCESS;
}

export class DeleteMovieFailure implements Action {
  readonly type = MovieActionTypes.DELETE_MOVIE_FAILURE;
}


export type AllMovieActions =
  | GetMovies
  | GetMoviesSuccess
  | GetMoviesFailure
  | SaveMovie
  | SaveMovieSuccess
  | SaveMovieFailure
  | DeleteMovie
  | DeleteMovieSuccess
  | DeleteMovieFailure;


