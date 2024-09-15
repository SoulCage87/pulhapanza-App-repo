import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HomeService } from '../../services/home.service';
import { CardComponent } from '../../components/card/card.component';
import { CharacterDto } from '../../models/character.dto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule, CardComponent],
})
export class HomePage implements OnInit {

  private _authService: AuthService = inject(AuthService);
  private _homeService: HomeService = inject(HomeService);

  nombre: string = '';
  apellido: string = '';
  characters: CharacterDto[] = [];

  ngOnInit() {
    this._authService.getUserById().then((user) => {
      this.nombre = user.nombre;
      this.apellido = user.apellido;
    }).catch((error) => {
      console.error(error);
    })

    this._homeService.getCharacters().subscribe(response => {
      this.characters = response.results 
    })
  }

}
