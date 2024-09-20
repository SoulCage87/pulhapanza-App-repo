import { Component } from '@angular/core';
import { IonTitle, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, folder, person, logoGoogle } from 'ionicons/icons';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs-page.page.html',
  styleUrls: ['./tabs-page.page.scss'],
  standalone: true,
  imports: [IonTitle, IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon]
})
export class TabsPagePage {

  constructor() { 
    addIcons({home, folder, person, logoGoogle})
  }


}
