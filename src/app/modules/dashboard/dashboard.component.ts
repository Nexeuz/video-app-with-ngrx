import { Component, OnInit } from '@angular/core';
import {RoutingPath} from '../../config/routing/routing-path';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/store/app-states';

@Component({
  selector: 'vt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  links = [
    {
      title: 'Mis reservas',
      link: RoutingPath.appRouting.modules.dashboard.pages.my_movies.path
    }
  ];
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

}
