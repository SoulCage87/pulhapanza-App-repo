import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl ,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { mail, lockClosed } from 'ionicons/icons'
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
  IonIcon
} from '@ionic/angular/standalone';
import { loginDto } from '../../models/login.dto';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonCard,
    IonCardContent,
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
    IonItem,
    IonText,
    CommonModule,
    FormsModule,
    ReactiveFormsModule]
})
export class LoginPage {

  private formBuiler: FormBuilder = inject(FormBuilder);
  loginDTO: loginDto = {} as loginDto

  spinner: boolean = false
  disabled: boolean = false


  loginForm: FormGroup = this.formBuiler.group({
    correo: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required,]]
  });

  constructor() {
    addIcons({ mail, lockClosed })
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

saveInfo(): void {
  this.spinner = true;
  this.disabled= true
  setTimeout(()=> {
    this.loginDTO = this.loginForm.value as loginDto;
    console.log(this.loginDTO);
    this.loginForm.reset();
    this.spinner = false;
    this.disabled = false
  }, 10000)
}

}

