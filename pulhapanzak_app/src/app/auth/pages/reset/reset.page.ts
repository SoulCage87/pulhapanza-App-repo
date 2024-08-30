import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonHeader,
  IonSpinner,
  IonNote,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { loginDto } from '../../models/login.dto';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonIcon,
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonHeader,
    IonTitle,
    IonSpinner,
    IonNote,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,]
})
export class ResetPage {

  private _formBuiler: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _authService: AuthService = inject(AuthService);
  private _alertController: AlertController = inject(AlertController);


  spinner: boolean = false;
  disabled: boolean = false;

  resetForm: FormGroup = this._formBuiler.group({
    correo: ['', [Validators.required, Validators.email]],
  })


  email: string = ''

  get isResetInvalid(): boolean {
    return this.resetForm.invalid;
  }

  get isEmailInvalid(): boolean {
    const control: AbstractControl | null = this.resetForm.get('correo')
    return control ? control.hasError('required') && control.touched : false
  }

  get isEmailError(): boolean {
    const control: AbstractControl | null = this.resetForm.get('correo')
    return control ? control.hasError('email') && control.touched : false
  }

  constructor() {
    addIcons({ arrowBackOutline })
  }

  goLogin(): void {
    this._router.navigate(['/login']);
  }

  async resetPass() {
    this.spinner = true;
    this.disabled = true;
    try {
      this.email = this.resetForm.get('correo')?.value as string;
      await this._authService.resetPass(this.email)
      await this.alertMessage('Correo enviado con Exito! Revisa tu bandeja de entrada')
      this.spinner = false;
      this.disabled = false;
      console.log(this.email)
    } catch (error: any) {
      await this.alertMessage('Ha ocurrido un error al enviar tu mensaje!', 'Error')
    } finally {
      this.spinner = false;
      this.disabled = false;
    }
  }

  async alertMessage(message: string, header: string = 'Atencion!'): Promise<void> {
    const alert = await this._alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this._router.navigate(['/login']);
          }
      }],
    })
    return await alert.present();
  }

}
