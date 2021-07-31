import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationCreateComponent } from './components/location/location-create/location-create.component';
import { LocationDetailsComponent } from './components/location/location-details/location-details.component';
import { LocationsListComponent } from './components/location/locations-list/locations-list.component';
import { LocationUpdateComponent } from './components/location/location-update/location-update.component';
import { AuthService } from "./services/auth.service";

import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorNotFoundComponent } from './components/shared/errors/error-not-found/error-not-found.component';
import { ErrorInternalServerComponent } from './components/shared/errors/error-internal-server/error-internal-server.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';

const mapConfig: YaConfig = {
  apikey: environment.yandexKey,
  lang: 'en_US',
};

@NgModule({
  declarations: [
    AppComponent,
    LocationCreateComponent,
    LocationDetailsComponent,
    LocationsListComponent,
    LocationUpdateComponent,
    NavigationComponent,
    HomeComponent,
    ErrorNotFoundComponent,
    ErrorInternalServerComponent,
    LoginComponent,
    RegisterComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA, // Both not working 
        NO_ERRORS_SCHEMA
      ]
})
export class AppModule { }
