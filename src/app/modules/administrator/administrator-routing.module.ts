import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DatatableComponent} from './pages/datatable/datatable.component';
import {RoutingPath} from '../../config/routing/routing-path';
import {MovieDetailComponent} from './pages/movie-detail/movie-detail.component';
import {AdministratorComponent} from './administrator/administrator.component';


const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    children: [
      {
        path: '',
        component: DatatableComponent
      },
      {
        path: RoutingPath.appRouting.modules.admin.pages.create_movie.path,
        component: MovieDetailComponent
      },
      {
        path: RoutingPath.appRouting.modules.admin.pages.edit_movie.pathParam,
        component: MovieDetailComponent
      },
    ]
  },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
