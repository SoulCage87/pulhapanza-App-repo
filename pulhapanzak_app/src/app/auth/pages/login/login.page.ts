import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl ,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { mail, lockClosed, logoGoogle } from 'ionicons/icons'
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonTitle,
  IonInputPasswordToggle,
  IonToolbar,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  IonText,
  IonNote,
  IonItem,
  IonRow,
  IonCol,
  IonIcon
} from '@ionic/angular/standalone';
import { loginDto } from '../../models/login.dto';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonCard,
    IonCardContent,
    IonCol,
    IonHeader,
    IonTitle,
    IonInputPasswordToggle,
    IonToolbar,
    IonNote,
    IonLabel,
    IonInput,
    IonIcon,
    IonButton,
    IonSpinner,
    IonRow,
    IonItem,
    IonText,
    CommonModule,
    FormsModule,
    ReactiveFormsModule]
})
export class LoginPage {

  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _toastController: ToastController = inject(ToastController);

  private formBuiler: FormBuilder = inject(FormBuilder);
  loginDTO: loginDto = {} as loginDto

  spinner: boolean = false
  disabled: boolean = false


  loginForm: FormGroup = this.formBuiler.group({
    correo: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required,]]
  });

  constructor() {
    addIcons({ mail, lockClosed, logoGoogle })
  }

get isLoginValid(): boolean {
  return this.loginForm.invalid;
}

get isEmailInvalid(): boolean{
  const control: AbstractControl | null = this.loginForm.get('correo')
  return control ? control.hasError('email') && control.touched : false
}

get isEmailRequired(): boolean {
  const control: AbstractControl | null = this.loginForm.get('correo')
  return control ? control.hasError('required') && control.touched : false
}

get isPassInvalid(): boolean {
  const control: AbstractControl | null = this.loginForm.get('pass')
  return control ? control.invalid && control.touched : false
}


async toastMessage(message: string, isError: boolean = true): Promise<void> {
  const toast = await this._toastController.create({
    message: message,
    duration: 7000,
    color: isError ? 'danger' : 'success',
  });
  return toast.present()
}

onSubmit(): void {
  if(!this.isLoginValid){
    this.spinner = true;
    this.disabled = true;
    this.loginDTO = this.loginForm.value as loginDto;

    this._authService.login(this.loginDTO).then(async(user) => {
      this.spinner = false
      this.disabled = false;
      console.log(user)
      await this.toastMessage('Login exitoso', false);
      this._router.navigate(['/home']);
    }).catch(async () => {
      this.spinner = false;
      this.disabled = false;
      await this.toastMessage('Correo o contraseña invalidos')
    })
  }
}

 async googleSignIn(): Promise<void> {
 await this.toastMessage('Proximamente!', false); 
}

goRegister(): void {
  this._router.navigate(['/register']);
}

}

