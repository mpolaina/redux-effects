import { Injectable } from '@angular/core';
// ngrx
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as uA from '../actions';
// servicio
import { UsuarioService } from '../../services/usuario.service';
// rxjs
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Usuario } from '../../model/usuario.model';

@Injectable()
export class UsuarioEffects {

  usuario: Usuario

  constructor (
    private actions$: Actions,
    private usuarioService: UsuarioService
  ){}

  cargarUsuario$ = createEffect(

      () => this.actions$.pipe(
        ofType( uA.cargarUsuario ),
        mergeMap( // contiene la action y extraemos el id de ella
          ( action ) => this.usuarioService.getUserById( action.id )
          .pipe(
            map( user => uA.cargarUsuarioExito( {usuario: user} )),
            catchError( err => of( uA.cargarUsuarioError({payload: err}) ) )
          )
        )
      )
  )
}
