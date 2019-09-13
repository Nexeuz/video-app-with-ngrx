import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoutingPath} from '../../config/routing/routing-path';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './dashboard.component';
import {NoLoggedGuard} from '../../core/guards/no-logged.guard';
import {MoviesListComponent} from './pages/movies-list/movies-list.component';
import {MovieDetailComponent} from './pages/movie-detail/movie-detail.component';
import {DetailPeliculaResolver} from '../../core/resolvers/detail-pelicula-resolver';
import {MyReservationsComponent} from './pages/my-reservations/my-reservations.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component:  MoviesListComponent,
      },
      {
        path: RoutingPath.appRouting.modules.dashboard.pages.movie_detail.pathParam,
        component: MovieDetailComponent,
        resolve: {
          resolverData: DetailPeliculaResolver
        },
      },
      {
        path: RoutingPath.appRouting.modules.dashboard.pages.register.path,
        component: RegisterComponent,
        canActivate: [NoLoggedGuard]
      },
      {
        path: RoutingPath.appRouting.modules.dashboard.pages.login.path,
        component: LoginComponent,
      },
      {
        path: RoutingPath.appRouting.modules.dashboard.pages.my_movies.path,
        component: MyReservationsComponent
      },
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
