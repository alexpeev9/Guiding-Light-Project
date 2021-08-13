import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../../models/location.model';
import { CrudService } from '../crud.service';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {
  public isLoaded: boolean = false;
  public locations!: Location[];
  constructor(private crudService: CrudService<Location>,private errorHandler: ErrorHandlerService) {
    this.retrieveLocations();
  }
  retrieveLocationsFromBase(): Observable<Location[]> {
    return this.crudService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ ...c.payload.val(), id: c.payload.key }) as Location
        )
      )
    )
  }
  retrieveLocations(): Subscription {
    return this.retrieveLocationsFromBase().subscribe(data => {
      this.locations = data;
      this.isLoaded = true;
    },
      (error) => {
        this.errorHandler.handleError(error);
      })
  }
}

