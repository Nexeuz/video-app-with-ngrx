import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoutingPath} from './config/routing/routing-path';
import {AdminGuard} from './core/guards/admin.guard';


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
    path: RoutingPath.appRouting.modules.admin.path,
    loadChildren: () => import('./modules/administrator/administrator.module').then(m => m.AdministratorModule),
    canActivate: [AdminGuard]
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
