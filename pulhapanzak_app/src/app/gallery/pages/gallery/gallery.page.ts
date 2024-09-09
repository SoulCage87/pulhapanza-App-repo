import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonImg } from '@ionic/angular/standalone';
import { GalleryService } from '../../services/gallery.service';
import { galleryDTO } from '../../models/gallery.dto';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonImg, CommonModule]
})
export class GalleryPage implements OnInit {

  constructor(private galleryService: GalleryService) { }
  galleries: galleryDTO[] = [];
  photos: string[] = []

  ngOnInit() {
    this.galleryService.getActiveGalleries().subscribe((data) => {
      this.galleries = data;
      this.photos = data.map((gallery) => gallery.photo)
      console.log(this.photos);
    })
  }




}


