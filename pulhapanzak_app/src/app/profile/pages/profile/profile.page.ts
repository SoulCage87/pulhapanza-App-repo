import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonLabel, IonInput, IonItem, IonIcon, IonText, IonNote, IonSpinner, IonButton, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, callOutline, logOutOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { registerDto } from 'src/app/auth/models/register.dto';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton,IonContent, IonHeader, IonTitle, IonSpinner , IonToolbar, CommonModule, IonImg, IonLabel, IonInput, IonItem, IonIcon, IonText, IonNote, ReactiveFormsModule]
})
export class ProfilePage {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _toastController: ToastController = inject(ToastController);
  private _profileService: ProfileService = inject(ProfileService);

  disabled: boolean = false;
  spinner: boolean = false;
  user: registerDto = {} as registerDto

  registerForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
    ID: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]],
    photo: ['', [Validators.required]],
  })

  constructor(){
    addIcons({personOutline, callOutline, logOutOutline})
  }

  get isNombreInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('nombre')
    return control ? control.invalid && control.touched : false
  }

  get isApellidoInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('apellido')
    return control ? control.invalid && control.touched : false
  }

  get isTelefonoMinLenght(): boolean {
    const control: AbstractControl | null = this.registerForm.get('telefono')
    return control ? control.hasError('minlength') && control.touched : false;
  }

  get isIDInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('ID')
    return control ? control.invalid && control.touched : false
  }

  get isIDMinLenght(): boolean {
    const control: AbstractControl | null = this.registerForm.get('ID')
    return control ? control.hasError('minlenght') && control.touched : false
  }


  get isFormInvalid(): boolean {
    return this.registerForm.invalid
  }

  get isTelefonoInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('telefono')
    return control ? control.hasError('required') && control.touched : false
  }

  ngOnInit() {
    this._authService
      .getUserById()
      .then((user) => {
        console.log('user ->', user);
        this.user = user!;
        this.registerForm.patchValue({
          nombre: this.user.nombre,
          apellido: this.user.apellido,
          telefono: this.user.telefono,
          ID: this.user.ID,
          photo: this.user.photo,
          uid: this.user.uid,
        });
        console.log(user?.photo)
      })
      .catch(async () => {
        await this.toastMessage('Ha ocurrido un error', false);
      });
  }

  async signOut(): Promise<void>{
    await this._authService.signOut().then( async () => {
     await this._router.navigate(['/login']);
     this.toastMessage('Has cerrado sesion correctamente!');
    }).catch(async () => {
     this.toastMessage('Ha ocurrido un error', false)
    })
   }

  async onPickImage(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      promptLabelHeader: 'Seleccione una Foto',
      promptLabelPhoto: 'Galeria',
      promptLabelPicture: 'Camara',
      promptLabelCancel: 'Cancelar'  
    });
    if(!image) return;

    this.user.photo = image.webPath ?? image.path ?? '';
    this.registerForm.patchValue({photo: this.user.photo})
   }

   async toastMessage(message: string, color: boolean = true): Promise<void> {
    const toast = await this._toastController.create({
      message: message,
      duration: 5000,
      color: color ? 'success' : 'danger' 
    })
    return toast.present()
  }

  onSubmit(): void {
    if (!this.isFormInvalid) {
      this.spinner = true;
      this.disabled = true;
      let user: registerDto = this.registerForm.value as registerDto;
      user.uid = this.user.uid;
     
     this._profileService.uploadImage(user.photo, user.uid).then(async (url: string) => {
         user.photo = url;
         this._authService
         .updateUser(user).then(async () => {
          await this.toastMessage('Se ha actualizado su perfil');
          this.spinner = false;
          this.disabled = false;
         })
         .catch(async () => {await this.toastMessage('Ha ocurrido un error', false);
          this.spinner = false;
          this.disabled = false;       
        });
     }).catch(async () => {
      await this.toastMessage('Ha ocurrido un error', false);
     })
    }
  }
}
