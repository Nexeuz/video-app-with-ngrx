import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../../core/models/movie';
import {RoutingPath} from '../../../../config/routing/routing-path';
import {Store} from '@ngrx/store';
import {State as MovieState} from '../../store/reducers/movies.reducers';
import {DeleteMyMovie, GetMyMovies} from '../../store/actions/movies.actions';

@Component({
  selector: 'vt-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit {
  @Input() isMyMovies: boolean;
  @Input() movie: Movie;
  detailRoute = '/' + RoutingPath.appRouting.modules.dashboard.path + '/' + RoutingPath.appRouting.modules.dashboard.pages.movie_detail.path;
  constructor(private store: Store<MovieState>) { }

  ngOnInit() {
  }

  deleteMovie() {
    this.store.dispatch(new DeleteMyMovie(this.movie.id));
  }

}
