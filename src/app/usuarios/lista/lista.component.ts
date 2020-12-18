import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = []
  cargando: boolean = false
  verError: any

  constructor(
      private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.select('usuarios').subscribe( ({ users, loading, error }) => {
      this.usuarios = users
      this.cargando = loading
      this.verError = error
    })

    this.store.dispatch( cargarUsuarios() )

    // LOS SERVICIOS SE LLAMAN EN EL EFFECT
    // this.usuarioService.getUsers()
    //     .subscribe( resp  => {
    //       console.log( resp )
    //       this.usuarios = resp
    //     })

  }



}
