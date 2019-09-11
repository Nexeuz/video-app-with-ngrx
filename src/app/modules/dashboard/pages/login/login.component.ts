import { Component, OnInit } from '@angular/core';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {FormGroup, FormGroupDirective} from '@angular/forms';
import {FormModelLogin} from '../../../../core/models/form-model-login';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app-states';
import {LogIn} from '../../../../store/actions/auth.actions';

@Component({
  selector: 'vt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  submit(form: FormGroupDirective) {
    this.store.dispatch(new LogIn({email: this.model.email, password: this.model.password}));
    form.resetForm();
  }

}
