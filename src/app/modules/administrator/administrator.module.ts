import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { DatatableComponent } from './pages/datatable/datatable.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import {AdminService} from './services/admin.service';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatIconModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import { AdministratorComponent } from './administrator/administrator.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMatFormFieldModule} from '@ngx-formly/material/form-field';
import {FormlyMatInputModule} from '@ngx-formly/material/input';
import {FormlyMatTextAreaModule} from '@ngx-formly/material/textarea';
import { DialogComponentComponent } from './compoents/dialog-component/dialog-component.component';


@NgModule({
  declarations: [DatatableComponent, MovieDetailComponent, AdministratorComponent, DialogComponentComponent],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    SharedModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMatFormFieldModule,
    FormlyMatInputModule,
    FormlyMatTextAreaModule,
    MatDialogModule
  ], providers: [AdminService],
  entryComponents: [DialogComponentComponent]
})
export class AdministratorModule { }
