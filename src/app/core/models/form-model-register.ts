import {ResponseRol} from './response-rol';

export interface FormModelRegister {
  name?: string;
  age?: number;
  email?: string;
  password?: {
    password: string;
    passwordConfirm: string;
  };
  passwordConfirm?: string;
  rol?: ResponseRol;
}
