import { Injectable } from "@angular/core";
// ngrx
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as usuariosActions from '../actions/usuarios.actions';
// servicio
import { UsuarioService } from '../../services/usuario.service';
// rxjs
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { of } from "rxjs";


@Injectable()
export class UsuariosEffects {

  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ){}
  // primer efecto
  cargarUsuarios$ = createEffect(

    () => this.actions$.pipe(
      ofType( usuariosActions.cargarUsuarios ),
      mergeMap( // petición de usuarios de la api => users
        () => this.usuarioService.getUsers()
          .pipe(  // ejecutamos la acción success
            tap( users => console.log('effects', users)),
            map( users => usuariosActions.cargarUsuariosSuccess( {usuarios: users} )),
            // catchError no devuelve $ por eso se pasa por of
            catchError( err => of( usuariosActions.cargarUsuariosError( {payload: err} ) ))
          )
      )
    )
  )

}
