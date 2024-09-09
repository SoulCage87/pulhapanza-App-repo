import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  async canActive(): Promise<boolean> {
    const isUserLogged: boolean = await this._authService.isUserLogged();
   if(!isUserLogged){
    this._router.navigate(['/login']);
   }
 return isUserLogged
  }
}
