import { createReducer, on } from '@ngrx/store';
import * as uA from '../actions';
import { Usuario } from '../../model/usuario.model';


export interface UsuarioState {
    id: string,
    user: Usuario,
    loading: boolean,
    loaded: boolean,
    error: any
}

export const usuarioInitialState: UsuarioState = {
  id: null,
  user: null,
  loading: false,
  loaded: false,
  error: null
}

const _usuarioReducer = createReducer(usuarioInitialState,

    on( uA.cargarUsuario, (state, { id }) => ({
          ...state,
          loading: true,
          id: id
    })),
    on( uA.cargarUsuarioExito, (state, { usuario }) => ({
          ...state,
          loading: false,
          loaded: true,
          user:  { ...usuario }
    })),
    on( uA.cargarUsuarioError, (state, { payload }) => ({
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

export function usuarioReducer(state, action) {
    return _usuarioReducer(state, action);
}
