import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, CharacterDto } from '../models/character.dto';
import { handRightSharp } from 'ionicons/icons';

const api = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _http: HttpClient = inject(HttpClient);
  private _toastController: ToastController = inject(ToastController);

  private handlerError<T>(message: string, result?:T) {
  return(): Observable<T> => {
    this.toastMessage(message, true);
    return of (result as T)
  }  

}

  async toastMessage(message: string, isError: boolean = false): Promise<void> {
    const toast = await this._toastController.create({
      message: message,
      duration: 3000,
      color: isError ? 'danger' : 'success',
    });
    return toast.present()
  }

  getCharacters(): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(`${api}`).pipe(
      tap((response) => response),
      catchError((error) => {
        this.toastMessage('Error al obtener los personajes', true);
        throw error
      })
    )
  }



  constructor() { }
}
