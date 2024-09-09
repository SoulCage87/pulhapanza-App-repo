import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  UserCredential,
  ActionCodeSettings,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';
import { loginDto } from '../models/login.dto';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { collection, doc, DocumentReference, getDoc, setDoc } from 'firebase/firestore';
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

  async getCurrenUser(): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      this._auth.onAuthStateChanged((user: User | null) => {
        console.log(user)
        if(user){
          resolve(user)
        }else{
          resolve(null)
        }
      })
    })
  }

  async getUserById(): Promise<registerDto> {
    try {
      const user = await this.getCurrenUser();
      const docRef = doc(this._firestore, PATH, user?.uid ?? '');
      const userSnapshot = await getDoc(docRef);
      if (userSnapshot.exists()) {
        return userSnapshot.data() as registerDto;
      }
      return {} as registerDto;
    } catch (error) {
      return {} as registerDto;
    }
  }
  
  async isUserLogged(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._auth.onAuthStateChanged((user: User | null) => {
        if (user) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }

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
    const isUserLogged: boolean = await this.isUserLogged();
    if (isUserLogged) return Promise.reject('User Logged');

    return await signInWithEmailAndPassword(this._auth,
      model.correo,
      model.pass)
  }

  async signUp(model: loginDto): Promise<UserCredential> {
    const isUserLogged: boolean = await this.isUserLogged();
    if (isUserLogged) return Promise.reject('User Logged');


    return await createUserWithEmailAndPassword(this._auth,
      model.correo,
      model.pass)
  }

  async resetPass(email: string, actionCodeSettings?: ActionCodeSettings | null): Promise<void> {
    try {
      return await sendPasswordResetEmail(this._auth, email, actionCodeSettings || undefined);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    const isUserLogged: boolean = await this.isUserLogged();
    if (isUserLogged) {
      return await this._auth.signOut()
    }
  }

  
}



