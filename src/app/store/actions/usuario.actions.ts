import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../model/usuario.model';

export const cargarUsuario = createAction(
  '[Usuario] Cargar Usuario',
  props<{ id: string }>()
);

export const cargarUsuarioExito = createAction(
    '[Usuarios] Cargar Usuario Exito',
    props<{ usuario: Usuario }>()
);
export const cargarUsuarioError = createAction(
    '[Usuario] Cargar Usuario Error',
    props<{ payload: any }>()
);
