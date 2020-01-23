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
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { UpdateInformationComponent } from './pages/tutor-profile/update-information/update-information.component';
import { TutorDetailComponent } from './pages/tutor/tutor-detail/tutor-detail.component';
import { StarRatingModule } from 'ionic4-star-rating';
import { ChatViewComponent } from './pages/my-tutors/chat-view/chat-view.component';
import { UserProfileViewComponent } from './pages/forum/user-profile-view/user-profile-view.component';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
                AppComponent,
                TopicFormComponent,
                DetailTopicComponent,
                UpdateInformationComponent,
                TutorDetailComponent,
                UserProfileViewComponent,
                ChatViewComponent
              ],
  entryComponents: [
                    TopicFormComponent,
                    DetailTopicComponent,
                    UpdateInformationComponent,
                    TutorDetailComponent,
                    UserProfileViewComponent,
                    ChatViewComponent
                  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    StarRatingModule,
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
    StatusBar,
    SplashScreen,
    FirstSignInGuard,
    AuthenticationService,
    ReactiveFormsModule,
    ImagePicker,
    WebView,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
