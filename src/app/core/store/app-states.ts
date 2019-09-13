import * as auth from './reducers/auth.reducers';
import * as movies from '../../modules/dashboard/store/reducers/movies.reducers';
import {createFeatureSelector} from '@ngrx/store';

export interface AppState {
  auth: auth.State;
  dashboard: movies.State;
}

export const reducers = {
  auth: auth.reducer,
  dashboard: movies.reducer
};
export const selectAuthState = createFeatureSelector<AppState>('auth');
export const dashboardState = createFeatureSelector<movies.State>('dashboard');
