import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();

    if (localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  onLogin(form: NgForm) {

    if ( form.valid) {

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title:  'Espere por favor...',
      });

      Swal.showLoading();

      this.auth.logIn(this.usuario)
      .subscribe(response => {
        

        Swal.close();

        if (this.recordarme){
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');

      }, (err) => {
        // console.log(err.error.error.message);

        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title:  err.error.error.message,
        });
      });

    } else {
        return;
    }
  }

}
