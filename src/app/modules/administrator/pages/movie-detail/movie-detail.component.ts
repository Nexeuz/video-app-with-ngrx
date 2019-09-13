import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormModelRegister} from '../../../../core/models/form-model-register';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {AdminService} from '../../services/admin.service';
import {Movie} from '../../../../core/models/movie';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {RoutingPath} from '../../../../config/routing/routing-path';
import {MoviesService} from '../../../dashboard/services/movies.service';
import {tap} from 'rxjs/operators';
import {DialogComponentComponent} from '../../compoents/dialog-component/dialog-component.component';

@Component({
  selector: 'vt-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  formLogin = new FormGroup({});
  model: Movie = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      modelOptions: {
        updateOn: 'change'
      },
      templateOptions: {
        label: 'Titulo de la pelicula',
        type: 'text',
        placeholder: 'Escribe el nombre de la pelicula',
        required: true,
        attributes: {
          autocomplete: ''
        },
        change: (field, $event) => {
        },
      },
      validation: {
        messages: {
          required: (error, field: FormlyFieldConfig) => 'Este campo es requerido',
        },
      },
    },
    {
      key: 'description',
      type: 'textarea',
      modelOptions: {
        updateOn: 'change'
      },
      templateOptions: {
        label: 'Descipcion',
        placeholder: 'Escribe una descripcion',
        required: true,
        autosize: true,
        change: (field, $event) => {
        },
      },
      validation: {
        messages: {
          required: (error, field: FormlyFieldConfig) => 'Este campo es requerido',
        },
      },
    },
    {
      key: 'img',
      type: 'input',
      modelOptions: {
        updateOn: 'change'
      },
      templateOptions: {
        type: 'text',
        label: 'URL de la imagen',
        placeholder: 'Escribe la url de la imagen',
        required: true,
        attributes: {
          autocomplete: 'email'
        },
        change: (field, $event) => {
        },
      },
      validation: {
        messages: {
          required: (error, field: FormlyFieldConfig) => 'Este campo es requerido',
        },
      },
    },


    {
      key: 'director',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Director',
        placeholder: 'Escribe el director',
        required: true,
      },
    },
    {
      key: 'price',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Escribe el precio',
        placeholder: 'Por favor confirma tu contraseña',
        required: true,

      },
    },
    {
      key: 'quantity',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Escribe la cantidad',
        placeholder: 'Por favor confirma tu contraseña',
        required: true,

      },
    },
    {
      key: 'actorList',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Escribe los actores',
        placeholder: 'Escribe los actores separados solo por espacios',
        required: true,
      },
    },
  ];

  id;
  isEdit = false;
  constructor(private _ADMIN: AdminService,
              private _SNACK: MatSnackBar,
              private _ROUTER: Router,
              private _MOVIES: MoviesService,
              private activated: ActivatedRoute) {
  }

  ngOnInit() {
    this.activated.params
      .subscribe(param => {
        this.id = param.id;
        this._MOVIES.getMovieById(this.id)
          .pipe(
            tap(response => {
              const actors = response.actorList.join(' ');
              const formatted = {
                ...response,
                actorList: actors
              };
              this.isEdit = true;
              this.formLogin.patchValue(formatted);
            })
          ).subscribe();
      });
  }



  submit(form) {
    const actorsList = this.formLogin.get('actorList').value as string;
    const actorsArr = actorsList.split(' ');

    if (this.id) {
      const movie: Movie = {
        ...this.model,
        id: this.id,
        actorList: actorsArr
      };
      this._ADMIN.updateMovie(movie, this.id)
        .subscribe(response => {
          this._SNACK.open('Pelicula creada correctamente', 'ok', {
            duration: 5000
          });
          this._ROUTER.navigateByUrl('/' + RoutingPath.appRouting.modules.admin.path);
        });
    } else {
      const movie: Movie = {
        ...this.model,
        id: parseInt(String((Math.random() * 10000)), 10),
        actorList: actorsArr
      };
      this._ADMIN.createMovie(movie)
        .subscribe(response => {
          this._SNACK.open('Pelicula creada correctamente', 'ok', {
            duration: 5000
          });
          this._ROUTER.navigateByUrl('/' + RoutingPath.appRouting.modules.admin.path);
        });
    }


  }

}
