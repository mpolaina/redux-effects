import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

// state
export interface AppState {
   usuarios: reducers.UsuariosState
   usuario: reducers.UsuarioState
}

// reducers
export const appReducers: ActionReducerMap<AppState> = {
   usuarios: reducers.usuariosReducer,
   usuario: reducers.usuarioReducer
}
