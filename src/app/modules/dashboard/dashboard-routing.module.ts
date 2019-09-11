import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoutingPath} from '../../config/routing/routing-path';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: RoutingPath.appRouting.modules.dashboard.pages.register.path,
        component: RegisterComponent
      },
      {
        path: RoutingPath.appRouting.modules.dashboard.pages.login.path,
        component: LoginComponent
      },
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
