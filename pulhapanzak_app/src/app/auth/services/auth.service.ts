import { inject, Injectable } from '@angular/core';
import { Auth, 
  signInWithEmailAndPassword,
  UserCredential } from '@angular/fire/auth';
import { loginDto } from '../models/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: Auth = inject(Auth)

  constructor() { }

  async login(model: loginDto): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this._auth, model.correo, model.pass)
  }
}
