import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CrudService } from '../crud.service';
import { Location } from 'src/app/models/location.model';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public isLoaded: boolean = false;
  public location!: Location;

  constructor(private crudService: CrudService<Location>,private errorHandler: ErrorHandlerService) {
  }

  retrieveDataFromBase(id: string): Observable<Location>{
     return this.crudService.getSingleEl(id).snapshotChanges().pipe(
       map(changes => 
         changes.payload.toJSON() as Location,
         ))
   }

  retrieveLocationAsForm(locationId: string, locationForm: FormGroup,coordX: number,coordY: number): void {
    this.crudService.getSingleEl(locationId).snapshotChanges().pipe(
      map(changes => 
        changes.payload.toJSON() as Location,
        )).subscribe(data => {
      this.location = data;
      this.location.id = locationId;
      locationForm.patchValue(this.location);
      coordX = this.location.coordX!;
      coordY = this.location.coordY!;
      this.isLoaded = true;
    },
      (error) => {
        this.errorHandler.handleError(error);
      });
  }

  retrieveLocationsAsData(locationId: string): void {
    this.retrieveDataFromBase(locationId).subscribe(data => {
        this.location = data;
        this.location.id = locationId;
        this.isLoaded = true;
    },
      (error) => {
        this.errorHandler.handleError(error);
      });
  }
}
