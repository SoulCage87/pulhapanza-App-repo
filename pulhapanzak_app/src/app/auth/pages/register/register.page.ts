import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonInput, IonItem, IonText, IonButton, IonSpinner, IonNote } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, lockClosedOutline, personOutline, mailOutline, calendarOutline, arrowBackOutline, idCardOutline, callOutline } from 'ionicons/icons'
import { registerDto } from '../../models/register.dto';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonSpinner,
    IonToolbar,
    CommonModule,
    IonLabel,
    IonButton,
    IonIcon,
    IonInput,
    IonItem,
    IonNote,
    IonText,
    ReactiveFormsModule]
})
export class RegisterPage{

  private formBuilder: FormBuilder = inject(FormBuilder)
  private _router: Router = inject(Router)


  registerDTO: registerDto = {} as registerDto
  spinner: boolean = false

  registerForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.min(8), Validators.pattern('^[0-9]*$')]],
    ID: ['', [Validators.required, Validators.min(13), Validators.pattern('^[0-9]*$')]],

  })

  constructor() {
    addIcons({callOutline , arrowBack, personOutline, mailOutline, lockClosedOutline, calendarOutline, arrowBackOutline, idCardOutline })
  }

  get isFormInvalid(): boolean {
    return this.registerForm.invalid
  }

  get isEmailInvalid(): boolean{
    const control: AbstractControl | null = this.registerForm.get('email')
    return control ? control.invalid && control.touched : false
  }

 

  get isPassInvalid(): boolean{
    const control: AbstractControl | null = this.registerForm.get('password')
    return control ? control.invalid && control.touched : false
  }

  get isNombreInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('nombre')
    return control ? control.invalid && control.touched : false
  }

  get isApellidoInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('apellido')
    return control ? control.invalid && control.touched : false
  }

  get isIDInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('ID')
    return control ? control.invalid && control.touched : false
  }

  get isDateInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('fechaNacimiento')
    return control ? control.invalid && control.touched : false
  }

  get isTelefonoInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('telefono')
    return control ? control.invalid && control.touched : false
  }


guardar(): void {
  this.spinner = true;
  setTimeout(() => {
    this.registerDTO = this.registerForm.value as registerDto;
    console.log('works =>', this.registerDTO)
    this.registerForm.reset();
    this.spinner = false;
  }, 5000)
}

goLogin(): void {
  this._router.navigate(['/login']);
}

}
