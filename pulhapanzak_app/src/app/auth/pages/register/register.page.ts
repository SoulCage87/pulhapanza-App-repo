import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonLabel, IonInput, IonItem, IonText, IonButton, IonSpinner, IonNote } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, lockClosedOutline, personOutline, mailOutline, calendarOutline, arrowBackOutline, idCardOutline, callOutline } from 'ionicons/icons'
import { registerDto } from '../../models/register.dto';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { user } from '@angular/fire/auth';



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
export class RegisterPage {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _alertController: AlertController = inject(AlertController);
  private _authService: AuthService = inject(AuthService);



  registerDTO: registerDto = {} as registerDto
  spinner: boolean = false
  disabled: boolean = false
  ID: string = ''

  registerForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
    ID: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],

  })

  constructor() {
    addIcons({ callOutline, arrowBack, personOutline, mailOutline, lockClosedOutline, calendarOutline, arrowBackOutline, idCardOutline })
  }

  get isFormInvalid(): boolean {
    return this.registerForm.invalid
  }

  get isEmailInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('correo')
    return control ? control.invalid && control.touched : false
  }

  get isTelefonoMinLenght(): boolean {
    const control: AbstractControl | null = this.registerForm.get('telefono')
    return control ? control.hasError('minlenght') : false
  }



  get isPassInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('pass')
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

  get isTelefonoInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('telefono')
    return control ? control.invalid && control.touched : false
  }




  guardar(): void {
    if (!this.isFormInvalid) {
      this.spinner = true;
      this.disabled = true;
      let newUser: registerDto = this.registerForm.value as registerDto;
     

      this._authService.signUp(newUser).then(async (result) => {
        newUser.uid = result.user.uid; 
        await this._authService.createUserInFirestore(newUser).then(async () => {
          this.spinner = false;
          this.disabled = false;
          await this.alertMessage('Te has registrado exitosamente!', 'Bienvenido!');
          this.registerForm.reset()
          this._router.navigate(['/home'])
        })
      }).catch(async (error) => {
        console.error(error);
        await this.alertMessage(error, 'Ha ocurrido un error!')
        this.spinner = false;
        this.disabled = false;
      })
    }
  }

  goLogin(): void {
    this._router.navigate(['/login']);
  }

  async alertMessage(message: string, header: string = 'Atencion!'): Promise<void> {
    const alert = await this._alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    })
    return await alert.present();
  }

}
