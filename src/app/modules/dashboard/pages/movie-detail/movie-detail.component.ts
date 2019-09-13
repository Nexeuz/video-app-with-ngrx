import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../../../core/models/movie';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../../../core/store/app-states';
import {Observable} from 'rxjs';
import {State as AuthState} from '../../../../core/store/reducers/auth.reducers';
import {SaveMovie} from '../../store/actions/movies.actions';

@Component({
  selector: 'vt-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  getState$: Observable<AuthState | any>;
  movieData = this.activated.snapshot.data.resolverData as Movie;
  constructor(private activated: ActivatedRoute,
              private store: Store<AppState>) {
   this.getState$ = this.store.select(selectAuthState);
  }

  ngOnInit() {
    console.log(this.activated.snapshot.data.resolverData);
  }


  reserve() {
    delete this.movieData.id;
    this.store.dispatch(new SaveMovie(this.movieData));
  }
}
