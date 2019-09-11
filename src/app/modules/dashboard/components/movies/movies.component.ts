import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../../../core/models/movie';
import {RoutingPath} from '../../../../config/routing/routing-path';

@Component({
  selector: 'vt-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit {
  @Input() movie: Movie;
  detailRoute = RoutingPath.appRouting.modules.dashboard.pages.movie_detail.path;
  constructor() { }

  ngOnInit() {
    console.log(this.detailRoute);
  }

}
