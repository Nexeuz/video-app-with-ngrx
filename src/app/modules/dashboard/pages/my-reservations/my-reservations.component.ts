import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {State as MovieState} from '../../store/reducers/movies.reducers';
import {GetMyMovies} from '../../store/actions/movies.actions';
import {dashboardState} from '../../../../core/store/app-states';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Movie} from '../../../../core/models/movie';

@Component({
  selector: 'vt-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {
  obsMyMovies$: Observable<Movie[]>;
  constructor(private store: Store<MovieState>) { }

  ngOnInit() {
    this.store.dispatch(new GetMyMovies());
    this.obsMyMovies$ = this.store.select(dashboardState)
      .pipe(
        map(response => {
          return response.myMovies ? response.myMovies : [];
        })
      );
  }

}
