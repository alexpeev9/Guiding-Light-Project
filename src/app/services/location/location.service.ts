import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { CrudService } from '../crud.service';
import { Location } from 'src/app/models/location.model';
import { LocationBindingService } from './location-binding.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private crudService!: CrudService<Location>;
  public locations!: Location[];
  private id!: string;

  constructor(
    private locationBindingService: LocationBindingService, 
    private db: AngularFireDatabase, 
    private activeRoute: ActivatedRoute,
    private locationData?: Location,
    private locationForm?: FormGroup) {
    this.crudService = new CrudService<Location>("locations", this.db);
    this.retrieveLocationAsForm();
    this.retrieveLocationsAsData();
  }

  retrieveLocationAsForm(): void {
     let locationId = this.activeRoute.snapshot.url[1].toString();
    this.crudService.getSingleEl(locationId).snapshotChanges().pipe(
      map(changes =>changes.payload.toJSON() as Location)).subscribe(data => {
      this.locationBindingService.location = data as Location;
      this.locationBindingService.location.id = locationId;
      this.locationForm?.patchValue(this.locationBindingService.location);
    },
      (error) => {
        // this.errorHandler.handleError(error);
        // this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  retrieveLocationsAsData(): void {
    let locationId = this.activeRoute.snapshot.url[1].toString();
    this.crudService.getSingleEl(locationId).snapshotChanges().pipe(
      map(changes =>changes.payload.toJSON() as Location)).subscribe(data => {
      this.locationBindingService.location = data;
      this.locationBindingService.location.id = locationId;
      this.locationData = this.locationBindingService.location;
    },
      (error) => {
        // this.errorHandler.handleError(error);
        // this.errorMessage = this.errorHandler.errorMessage;
      });
  }
}
