import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule
} from '@angular/material';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMatFormFieldModule} from '@ngx-formly/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyMatInputModule} from '@ngx-formly/material/input';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './dashboard.component';
import {FormlyMatSelectModule} from '@ngx-formly/material/select';
import {SharedModule} from '../../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import { MoviesComponent } from './components/movies/movies.component';
import {reducer as movieReducer} from './store/reducers/movies.reducers';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import {EffectsModule} from '@ngrx/effects';
import {MoviesEffectsService} from './store/effects/movies-effects.service';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, DashboardComponent, MoviesComponent, MoviesListComponent, MovieDetailComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    ReactiveFormsModule,
    StoreModule.forFeature('dashboard', movieReducer),
    EffectsModule.forFeature([MoviesEffectsService]),

    FormlyModule.forChild(),
    FormlyMatSelectModule,
    FormlyMatFormFieldModule,
    FormlyMatInputModule,
    MatButtonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule,
    MatListModule,
  ],
  providers: [MoviesEffectsService]
})
export class DashboardModule { }
