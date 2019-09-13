import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {FormModelRegister} from '../../../../core/models/form-model-register';
import {AuthService} from '../../../../core/authentication/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/store/app-states';
import {User} from '../../../../core/models/user';
import {SignUp} from '../../../../core/store/actions/auth.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'vt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {


  formLogin = new FormGroup({});
  model: FormModelRegister = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      modelOptions: {
        updateOn: 'change'
      },
      templateOptions: {
        label: 'Nombre',
        type: 'text',
        placeholder: 'Escribe tu nombre completo',
        required: true,
        attributes: {
          autocomplete: 'username'
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
      key: 'age',
      type: 'input',
      modelOptions: {
        updateOn: 'change'
      },
      templateOptions: {
        type: 'number',
        label: 'Edad',
        placeholder: 'Escribe tu edad',
        required: true,
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
      key: 'password',
      validators: {
        fieldMatch: {
          expression: (control) => {
            const value = control.value;
            return value.passwordConfirm === value.password
              || (!value.passwordConfirm || !value.password);
          },
          message: 'Las contraseñas no conciden',
          errorPath: 'passwordConfirm',
        },
      },
      fieldGroup: [
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Contraseña',
            placeholder: 'Al menos 3 carácteres',
            required: true,
            minLength: 3,
            attributes: {
              autocomplete: 'current-password'
            }
          },
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Confirmar contraseña',
            placeholder: 'Por favor confirma tu contraseña',
            required: true,
            attributes: {
              autocomplete: 'new-password'
            }
          },
        },
      ],
    },
    {
      key: 'rol',
      type: 'select',
      modelOptions: {
        updateOn: 'change'
      },
      templateOptions: {
        label: 'Rol',
        placeholder: 'Selecciona un rol',
        required: true,
        options: this._AUTH.listRol(),
        valueProp: (admin) => admin,
        labelProp: (admin) => admin.description,
        change: (field, $event) => {
        },
      },
      validation: {
        messages: {
          required: (error, field: FormlyFieldConfig) => 'Este campo es requerido',
        },
      },
    }
  ];

  constructor(private _AUTH: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
  }

  submit(form: FormGroupDirective) {
    const user: User = {
      age: this.model.age,
      password: this.model.password.password,
      isAdmin: this.model.rol.id === 1,
      id: Math.floor(Math.random()),
      email: this.model.email,
      name: this.model.name
    };
    this.store.dispatch(new SignUp({...user}));

    form.resetForm();
    this.router.navigate(['']);

  }

}
