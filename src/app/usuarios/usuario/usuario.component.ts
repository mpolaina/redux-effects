import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.reducer';
import { cargarUsuario } from '../../store/actions/usuario.actions';

import { Usuario } from '../../model/usuario.model';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  idUsuario: string = ''
  usuario: Usuario

  usuarioSubs: Subscription

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.usuario = new Usuario()
    // console.log('USUARIO: ', this.usuario)

    this.usuarioSubs = this.store.select('usuario')
        .pipe(
          // tap( resp => console.log('resp select: ', resp))
          filter(({ user }) => user != null ),
        )
        .subscribe( ( {user, loaded, loading, error} ) => {
          this.usuario = user
          // console.log('USUARIO SELECT: ' ,this.usuario)
        })

    this.router.params.subscribe( ({ id }) => {

          this.store.dispatch( cargarUsuario( {id: id} ) )
    })








  }

}
