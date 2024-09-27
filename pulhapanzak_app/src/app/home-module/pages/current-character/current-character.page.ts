import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonCard, IonContent, IonHeader, IonIcon, IonImg, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {ActivatedRoute, Router} from "@angular/router";
import {addIcons} from "ionicons";
import {arrowBack} from "ionicons/icons";

@Component({
  selector: 'app-current-character',
  templateUrl: './current-character.page.html',
  styleUrls: ['./current-character.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonCard, IonIcon]
})
export class CurrentCharacterPage implements OnInit {

private _routeActivate: ActivatedRoute = inject(ActivatedRoute);
private _route: Router = inject(Router);

data: any = {}
  image: string = ''
  name: string = ''
  status: string = ''


  constructor() {
  addIcons({arrowBack})
  }

  goBack(): void {
  this._route.navigate(['tabs/home'])
  }

ngOnInit() {
  this._routeActivate.queryParams.subscribe(params => {
    this.data = JSON.parse(params['data']);
    this.image = this.data.image;
    this.name = this.data.name;
    this.status = this.data.status;

  })
}

}
