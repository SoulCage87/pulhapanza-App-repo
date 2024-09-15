import { Component, Input } from '@angular/core';
import { IonAvatar, IonCard, IonItem, IonLabel, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [IonImg, IonCard, IonItem, IonAvatar, IonLabel]
})
export class CardComponent {

  @Input() name: string = '';
  @Input() species: string = '';
  @Input() status: string = '';
  @Input() imageUrl: string = '';

}
