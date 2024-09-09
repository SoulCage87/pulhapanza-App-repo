import { inject, Injectable } from '@angular/core';
import { collection, CollectionReference, Firestore, orderBy, query, where } from '@angular/fire/firestore';
import { galleryDTO } from '../models/gallery.dto';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
const PATH: string = 'galleries'

@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  private _firestore: Firestore = inject(Firestore);
  private _authService: AuthService = inject(AuthService);
  private _collection: CollectionReference = collection(this._firestore, PATH);

  getActiveGalleries(): Observable<galleryDTO[]> {
    const galleriesRef = this._collection;
    const q = query(galleriesRef, 
    where('active', '==', true), 
    orderBy('createdAt','desc'));

    return collectionData(q, { idField: 'uid' }) as Observable<galleryDTO[]>
  }




}
