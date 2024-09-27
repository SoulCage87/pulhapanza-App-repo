import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { IonButton, IonContent, IonHeader, IonIcon, IonSpinner, IonTextarea, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { addIcons } from 'ionicons';
import { imageOutline } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';


const googleGenerativeIA = new GoogleGenerativeAI(environment.API_KEY_GEMINI);
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 500,
  responseMimeType: 'text/plain'
}

const model = googleGenerativeIA.getGenerativeModel({
  model: 'gemini-1.5-flash',
  ...generationConfig
})

function fileToGenerativePart(imageBase64: string, mimeType: string) {
  return {
    inlineData: {
      data: imageBase64, 
      mimeType: mimeType 
    }
  };
}

@Component({
  selector: 'app-gemini',
  templateUrl: './gemini.page.html',
  styleUrls: ['./gemini.page.scss'],
  standalone: true,
  imports: [IonButton ,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonTextarea, FormsModule, IonSpinner, IonIcon]
})
export class GeminiPage {

  private _toastMessage: ToastController = inject(ToastController);
  spinner = signal<boolean>(false);
  prompt = signal<string>('');
  image: string = ''
  mimetype: string = ''
  resultImage: string = ''
  result = signal<string>('');
  
  constructor() {
    addIcons({imageOutline})
  }  

 async sendMessageToGemini(): Promise<void> {
  if(this.prompt().length == 0){
    this.showAlert('Por favor, hable con Gemini', true);
    return;
  }

  this.spinner.set(true);
  const contentResult = await model.generateContent(this.prompt());
  const response = contentResult.response;
  this.result.set(response.text() || 'No se recibio ninguna respuesta por parte de Gemini');
  this.spinner.set(false);
 }


  async showAlert(message: string, error: boolean = false): Promise<void> {
    const toast = await this._toastMessage.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      color: error ? 'danger' : 'success',
      mode: 'ios',
    });
    await toast.present();
  }

  async onPickImage(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      saveToGallery: true,
      promptLabelHeader: 'Seleccione una Foto',
      promptLabelPhoto: 'Galeria',
      promptLabelPicture: 'Camara',
      promptLabelCancel: 'Cancelar'  
    });
    if(!image) return;

    this.image = image.base64String ?? '';
    this.mimetype = image.format ?? '';
    this.resultImage = `data:${this.mimetype};base64,${this.image}`
   }

  updatePromptValue(newValue: string) {
    this.prompt.set(newValue);
  }

}
