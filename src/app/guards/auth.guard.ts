import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService,
              private routes: Router) { }

  canActivate(): boolean{

    if(this.auth.estaAuth()){
      return true;
    }else{
      this.routes.navigateByUrl('/login');
      return false;
    }
  }

}
