import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  UserCredential,
  ActionCodeSettings
} from '@angular/fire/auth';
import { loginDto } from '../models/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: Auth = inject(Auth);

  


  constructor() { }

  async login(model: loginDto): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this._auth, model.correo, model.pass)
  }

  async resetPass(email: string,  actionCodeSettings ? :  ActionCodeSettings | null): Promise<void> {
    try {
      return await sendPasswordResetEmail(this._auth, email, actionCodeSettings || undefined); 
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


}
