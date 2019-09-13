import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import { State as MovieState} from '../../store/reducers/movies.reducers';
import {GetMovies} from '../../store/actions/movies.actions';
import {Observable, of, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MoviesService} from '../../services/movies.service';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, take, takeUntil} from 'rxjs/operators';
import {AppState, dashboardState} from '../../../../core/store/app-states';

@Component({
  selector: 'vt-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  controlSearch: FormControl = new FormControl('');
  subject$: Subject<boolean> = new Subject<boolean>();
  moviesObs$: Observable<any>;

  constructor(private store: Store<MovieState>,
              private _MOVIES: MoviesService) {
    this.store.dispatch(new GetMovies());
    this.moviesObs$ = this.store.select(dashboardState)
      .pipe(
        map((result: MovieState) => result.movies ? result.movies : []),
        takeUntil(this.subject$)
      );
  }

  ngOnInit() {
    this.subject();
  }

  subject() {
    this.subject$
      .pipe(
        take(1)
      ).subscribe(result => {
      this.moviesObs$ = this.controlSearch.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(value => {
            if (value) {
              return this._MOVIES.getMovieList(value);
            } else {
              this.reset();
              return of([]);
            }
          })
        );
    });
  }

  ngOnDestroy(): void {

  }

  search() {
    if (this.controlSearch.value) {
      this.subject$.next(true);
    }

  }

  reset() {
    this.moviesObs$ = this.store.select(dashboardState)
      .pipe(
        map((result: MovieState) => result.movies ? result.movies : []),
      );
    this.subject();
    this.controlSearch.setValue('');
  }


}
