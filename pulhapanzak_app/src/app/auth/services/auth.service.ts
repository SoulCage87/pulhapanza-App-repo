import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  UserCredential,
  ActionCodeSettings
} from '@angular/fire/auth';
import { loginDto } from '../models/login.dto';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { collection, doc, DocumentReference, setDoc } from 'firebase/firestore';
import { registerDto } from '../models/register.dto';

const PATH: string = 'users'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: Auth = inject(Auth);
  private _firestore: Firestore = inject(Firestore);
  private _collection: CollectionReference = collection(this._firestore, PATH);

  constructor() { }

  async createUserInFirestore(user: registerDto): Promise<void> {
    const docRef: DocumentReference = doc(this._collection, user.uid);
    await setDoc(docRef, {
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      telefono: user.telefono,
      ID: user.ID,
      uid: user.uid
    });
  }
  
  
  async login(model: loginDto): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this._auth, model.correo, model.pass)
  }

  async signUp(model: loginDto): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this._auth, 
      model.correo, 
      model.pass)
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
