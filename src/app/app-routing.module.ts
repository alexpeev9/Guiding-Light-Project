import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationCreateComponent } from './components/location/location-create/location-create.component';
import { LocationsListComponent } from './components/location/locations-list/locations-list.component';
import { LocationUpdateComponent } from './components/location/location-update/location-update.component';
import { LocationDetailsComponent } from './components/location/location-details/location-details.component';
import { ErrorNotFoundComponent } from './components/shared/errors/error-not-found/error-not-found.component';
import { ErrorInternalServerComponent } from './components/shared/errors/error-internal-server/error-internal-server.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { 
    path: 'location-create',
    component: LocationCreateComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },

  { 
    path: 'locations', 
    component: LocationsListComponent 
  },

  { 
    path: 'location-update/:id', 
    component: LocationUpdateComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
  { 
    path: 'location-details/:id', 
    component: LocationDetailsComponent,
  },

  { 
    path: 'login', 
    component: LoginComponent,    
  },

  { 
    path: 'register', 
    component: RegisterComponent
  },

  { 
    path: '500', 
    component: ErrorInternalServerComponent 
  },

  { 
    path: '404', 
    component : ErrorNotFoundComponent
  },

  { 
    path: '**', 
    redirectTo: '/404', 
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
