import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {ActionPerformed, PushNotificationSchema, PushNotifications, Token} from '@capacitor/push-notifications'
import { AuthService } from './auth/services/auth.service';
import { registerDto } from './auth/models/register.dto';
import { DeviceDto } from './auth/models/device.dto';
import { notifications } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  private _authService: AuthService = inject(AuthService);
  private userId: string | null = null;

 ngOnInit(): void {
   this._authService.getCurrentUserId().then((user: string | null) => {
     this.userId = user;
     this.PermissionNotifications();
   })
  }
 
PermissionNotifications(): void {
  PushNotifications.requestPermissions().then((result) => {
    if(result.receive == 'granted'){
      PushNotifications.register();
    }
  });

  PushNotifications.addListener('registration', (token: Token) => {
    if(this.userId){
    const device: DeviceDto = {
      userId: this.userId,
      deviceId: token.value
    }
    this._authService.createDevice(device);
    }
  });

  PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
    console.log(notification);
  });

  PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
    console.log(notification);
  })
}


}
