import { FormsModule } from '@angular/forms';
import { WelcomeGuard } from './shared/welcomGuard.service';
import { AuthGuard } from './shared/authguard.service';
import { EventService } from 'src/app/services/EventService';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { HttpClientModule } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,FormsModule, IonicModule.forRoot({mode:'md', scrollAssist: false}), HttpClientModule,AppRoutingModule,],
  providers: [
    StatusBar,Network, EventService, AuthGuard, WelcomeGuard,Camera,ImagePicker,
    SplashScreen,Device,AppVersion,Clipboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal],
  bootstrap: [AppComponent],
})
export class AppModule {}
