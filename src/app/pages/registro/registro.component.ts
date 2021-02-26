import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   }

   onSubmit(form: NgForm){

    if (form.invalid){
      return;
    } else {

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title:  'Espere por favor...',
      });
      Swal.showLoading();

      this.auth.registrarUsuarioNuevo(this.usuario)
      .subscribe( respuesta => {

        // console.log(respuesta);
        Swal.close();

        if (this.recordarme){
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');

      }, (err) =>{

        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title:  err.error.error.message,
        });
        // console.log(err.error.error.message);
      });
    }
   }

}
