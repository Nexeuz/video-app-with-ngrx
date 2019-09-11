import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMatNativeSelectModule} from '@ngx-formly/material/native-select';
import {FormlyMatFormFieldModule} from '@ngx-formly/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyMatInputModule} from '@ngx-formly/material/input';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './dashboard.component';
import {FormlyMatSelectModule} from '@ngx-formly/material/select';
import {SharedModule} from '../../shared/shared.module';
import {StoreModule} from '@ngrx/store';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    StoreModule.forFeature('dashboard', {}),
    FormlyModule.forChild(),
    FormlyMatSelectModule,
    FormlyMatFormFieldModule,
    FormlyMatInputModule,
    MatButtonModule,
    SharedModule
  ]
})
export class DashboardModule { }
