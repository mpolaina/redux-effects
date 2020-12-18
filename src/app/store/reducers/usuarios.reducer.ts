import { createReducer, on } from '@ngrx/store';
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError } from '../actions';
import { Usuario } from '../../model/usuario.model';


export interface UsuariosState {
    users: Usuario[],
    loading: boolean,
    loaded: boolean,
    error: any
}

export const usuariosInitialState: UsuariosState = {
  users: [],
  loading: false,
  loaded: false,
  error: null
}

const _usuariosReducer = createReducer(usuariosInitialState,

    on( cargarUsuarios, state => ({ ...state, loading: true, loaded: false })),
    on( cargarUsuariosSuccess, (state, { usuarios }) => ({
          ...state,
          loading: false,
          loaded: true,
          users: [ ...usuarios ],
    })),
    on( cargarUsuariosError, (state, { payload }) => ({
          ...state,
          loading: false,
          loaded: false,
          error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
          }
    })),

);

export function usuariosReducer(state: UsuariosState, action) {
    return _usuariosReducer(state, action);
}
