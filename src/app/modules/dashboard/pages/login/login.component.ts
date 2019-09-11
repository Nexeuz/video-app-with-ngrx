import { Component, OnInit } from '@angular/core';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {FormModelLogin} from '../../../../core/models/form-model-login';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/store/app-states';
import {LogIn} from '../../../../core/store/actions/auth.actions';
import {RoutingPath} from '../../../../config/routing/routing-path';
import {Router} from '@angular/router';

@Component({
  selector: 'vt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  routerRegister = RoutingPath.appRouting.modules.dashboard.pages.register.path;
  formRegister = new FormGroup({});
  model: FormModelLogin = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      modelOptions: {
        updateOn: 'change'
      },
      templateOptions: {
        type: 'email',
        label: 'Email',
        placeholder: 'Escribe tu email',
        required: true,
      },
      validation: {
        validation: Validators.email,
        messages: {
          required: (error, field: FormlyFieldConfig) => 'Este campo es requerido',

        },

      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Contraseña',
        placeholder: 'Escribe tu contraseña',
        required: true,
      },
      validation: {
        messages: {
          required: (error, field: FormlyFieldConfig) => 'Este campo es requerido',
        },
      },
    },
  ];
  constructor(private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
  }

  submit(form: FormGroupDirective) {
    this.store.dispatch(new LogIn({email: this.model.email, password: this.model.password}));
    form.resetForm();
    this.router.navigate(['']);
  }

}
