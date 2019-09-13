import { AllMovieActions, MovieActionTypes } from '../actions/movies.actions';
import {Movie} from '../../../../core/models/movie';

export interface State {
  movies: Movie[] | null;
  errorMessage: string | null;
  selectedMovie: Movie | null;
  myMovies: Movie[] | null;
}


export const initialState: State = {
  movies: null,
  errorMessage: null,
  selectedMovie: null,
  myMovies: null
};


export function reducer(state = initialState, action: AllMovieActions): State {
  switch (action.type) {
    case MovieActionTypes.GET_MOVIE_SUCCESS:
      return {
        ...state,
        movies:  action.payload,
        errorMessage: null
      };
    case MovieActionTypes.GET_MOVIE_FAILURE: {
      return {
        ...state,
        errorMessage: 'Error al tratar de recuperar las peliculas'
      };
    }
    case MovieActionTypes.GET_MY_MOVIES_SUCCESS:
      return {
        ...state,
        myMovies:  action.payload,
        errorMessage: null
      };
    case MovieActionTypes.GET_MY_MOVIE_FAILURE: {
      return {
        ...state,
        errorMessage: 'Error al tratar de recuperar las peliculas'
      };
    }
    case MovieActionTypes.SAVE_MOVIE_SUCCESS:
      return  {
        ...state,
        selectedMovie: state.selectedMovie
      };
    case MovieActionTypes.SAVE_MOVIE_FAILURE:
      return {
        ...state,
        errorMessage: 'Error al tratar de reservar la pelicula'
      };

    default: {
      return state;
    }
  }
}
