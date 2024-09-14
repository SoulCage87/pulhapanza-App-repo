import { inject, Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

const folder: string = 'users'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

private _storage: Storage = inject(Storage)

async uploadImage(image: string, userId: string): Promise<string>{
  try {
    console.log(userId);
    const url = `${folder}/${userId}.jpg`;
    const storageRef = ref(this._storage, url);

    const imgExist = await getDownloadURL(storageRef).catch(() => null);
    if(imgExist) {
      await deleteObject(ref(this._storage, imgExist));
    }

    const file = await fetch(image);
    const blob = await file.blob();
    const result = await uploadBytes(storageRef, blob);
    const imageUrl = await getDownloadURL(result.ref);
    return imageUrl;
  } catch (error) {
    throw new Error('No se ha subido la imagen ')
  }
}
}
