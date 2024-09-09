import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule],
})
export class HomePage implements OnInit {

  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _toastController: ToastController = inject(ToastController);

  nombre: string = '';
  apellido: string = '';

  async toastMessage(message: string, color: boolean = true): Promise<void> {
    const toast = await this._toastController.create({
      message: message,
      duration: 5000,
      color: color ? 'success' : 'danger'
    })
    return toast.present()
  }

  ngOnInit() {
    this._authService.getUserById().then((user) => {
      this.nombre = user.nombre;
      this.apellido = user.apellido;
    }).catch((error) => {
      console.error(error);
    })
  }




  async signOut(): Promise<void>{
   await this._authService.signOut().then( async () => {
    await this._router.navigate(['/login']);
    this.toastMessage('Has cerrado sesion correctamente!');
   }).catch(async () => {
    this.toastMessage('Ha ocurrido un error', false)
   })
  }

}
