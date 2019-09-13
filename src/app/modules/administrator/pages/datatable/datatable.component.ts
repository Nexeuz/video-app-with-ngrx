import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {MatDialog, MatPaginator, MatSnackBar} from '@angular/material';
import {merge, of} from 'rxjs';
import {catchError, delay, map, startWith, switchMap} from 'rxjs/operators';
import {Movie} from '../../../../core/models/movie';
import {State, Store} from '@ngrx/store';
import {State as MovieState} from '../../../dashboard/store/reducers/movies.reducers';
import {RoutingPath} from '../../../../config/routing/routing-path';
import {DialogComponentComponent} from '../../compoents/dialog-component/dialog-component.component';

@Component({
  selector: 'vt-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  routerCreate = RoutingPath.appRouting.modules.admin.pages.create_movie.path;
  routerEdit = RoutingPath.appRouting.modules.admin.pages.edit_movie.path;
  data: Movie[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'quantity', 'actions'];
  isLoadingResults = true;
  firstTime = 0;
  resultsLength: number;
  constructor(private _ADMIN: AdminService,
              public dialog: MatDialog,
              public _SNACK: MatSnackBar) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._ADMIN.getMovieList(this.paginator.pageIndex + 1)
            .pipe(
              delay(1500)
            );
        }),
        map(data => {
          this.isLoadingResults = false;
          if (this.firstTime === 0) {
            this.resultsLength = data.length;
            this.firstTime++;
          }
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      ).subscribe((data) => this.data = data);
  }

  deleteMovie(id) {

    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '320px',
    });
    dialogRef.afterClosed().subscribe(status => {
      if (status) {
        this._ADMIN.deleteMovie(id)
          .subscribe(result => {
            this._SNACK.open('Pelicula eliminada correctamente', 'ok', {
              duration: 5000
            });
            this.ngAfterViewInit();
          });
      }
    });

  }


}
