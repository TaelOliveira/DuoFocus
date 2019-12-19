import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { IonicStorageModule } from '@ionic/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FirstSignInGuard } from './guards/first-sign-in.guard';

import * as firebase from 'firebase';
import { TopicFormComponent } from './pages/forum/topic-form/topic-form.component';
import { DetailTopicComponent } from './pages/forum/detail-topic/detail-topic.component';
firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [AppComponent, TopicFormComponent, DetailTopicComponent],
  entryComponents: [TopicFormComponent, DetailTopicComponent ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    Firebase,
    StatusBar,
    SplashScreen,
    FirstSignInGuard,
    AuthenticationService,
    ReactiveFormsModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
