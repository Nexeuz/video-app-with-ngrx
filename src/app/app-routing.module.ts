import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoutingPath} from './config/routing/routing-path';


const routes: Routes = [
  {
    path: '',
    redirectTo: RoutingPath.appRouting.modules.dashboard.path,
    pathMatch: 'full'
  },
  {
    path: RoutingPath.appRouting.modules.dashboard.path,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: RoutingPath.appRouting.modules.dashboard.path,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
