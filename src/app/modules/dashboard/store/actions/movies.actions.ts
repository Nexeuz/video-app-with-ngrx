import {Action} from '@ngrx/store';
import {Movie} from '../../../../core/models/movie';


export enum MovieActionTypes {
  GET_MOVIES = '[Movie] GET movies from backend',
  GET_MOVIE_SUCCESS = '[Movie] Successful retrieve movies',
  GET_MOVIE_FAILURE = '[Movie] error trying retrieve movies',
  GET_MY_MOVIES = '[Movie] GET my movies from backend',
  GET_MY_MOVIES_SUCCESS = '[Movie] Successful retrieve my movies',
  GET_MY_MOVIE_FAILURE = '[Movie] error trying retrieve my movies',
  SAVE_MOVIE  = '[Movie] try reserve movie',
  SAVE_MOVIE_SUCCESS  = '[Movie] Successful saved movies',
  SAVE_MOVIE_FAILURE = '[Movie] error trying retrieve movies',
  DELETE_MOVIE  = '[Movie] try delete movie',
  DELETE_MOVIE_SUCCESS  = '[Movie] Successful deleted movie',
  DELETE_MOVIE_FAILURE = '[Movie] error trying deleting movie',
}

export class GetMovies implements Action {
  readonly type = MovieActionTypes.GET_MOVIES;
}


export class GetMoviesSuccess implements Action {
  readonly type = MovieActionTypes.GET_MOVIE_SUCCESS;
  constructor(public payload: Movie[]) {}
}

export class GetMoviesFailure implements Action {
  readonly type = MovieActionTypes.GET_MOVIE_FAILURE;
}

export class GetMyMovies implements Action {
  readonly type = MovieActionTypes.GET_MY_MOVIES;
}


export class GetMyMoviesSuccess implements Action {
  readonly type = MovieActionTypes.GET_MY_MOVIES_SUCCESS;
  constructor(public payload: Movie[]) {}
}

export class GetMyMoviesFailure implements Action {
  readonly type = MovieActionTypes.GET_MY_MOVIE_FAILURE;
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


export class DeleteMyMovie implements Action {
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
  | GetMyMovies
  | GetMyMoviesSuccess
  | GetMyMoviesFailure
  | GetMovies
  | GetMoviesSuccess
  | GetMoviesFailure
  | SaveMovie
  | SaveMovieSuccess
  | SaveMovieFailure
  | DeleteMyMovie
  | DeleteMovieSuccess
  | DeleteMovieFailure;


