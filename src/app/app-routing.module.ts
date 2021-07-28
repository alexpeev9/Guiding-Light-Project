import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationCreateComponent } from './components/location/location-create/location-create.component';
import { LocationsListComponent } from './components/location/locations-list/locations-list.component';
import { LocationUpdateComponent } from './components/location/location-update/location-update.component';
const routes: Routes = [
  { path: 'location-create', component: LocationCreateComponent },
  { path: 'locations', component: LocationsListComponent },
  { path: 'location-update/:id', component: LocationUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
