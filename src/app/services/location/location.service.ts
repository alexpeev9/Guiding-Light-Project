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
  public location!: Location;
  private id!: string;

  constructor(
    private db: AngularFireDatabase,
    private locationForm?: FormGroup) {
    this.crudService = new CrudService<Location>(db);
  }

  retrieveDataFromBase(id: string): Observable<Location>{
   return this.crudService.getSingleEl(id).snapshotChanges().pipe(
      map(changes =>changes.payload.toJSON() as Location))
  }

  retrieveLocationAsForm(locationId: string): void {
    this.retrieveDataFromBase(locationId).subscribe(data => {
      this.location = data as Location;
      this.location.id = locationId;
      this.locationForm?.patchValue(this.location);
    },
      (error) => {
        // this.errorHandler.handleError(error);
        // this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  retrieveLocationsAsData(locationId: string): void {
    this.retrieveDataFromBase(locationId).subscribe(data => {
        this.location = data;
        this.location.id = locationId;
    },
      (error) => {
        // this.errorHandler.handleError(error);
        // this.errorMessage = this.errorHandler.errorMessage;
      });
      // return this.location;
  }
}
