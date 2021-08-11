import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../../models/location.model';
import { CrudService } from '../crud.service';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {
  private crudService!: CrudService<Location>;
  public locations!: Location[];
  constructor(private db: AngularFireDatabase) { 
    this.crudService = new CrudService<Location>(this.db);
    this.retrieveLocations();
  }

  retrieveLocationsFromBase(): Observable<Location[]> {
    return this.crudService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({...c.payload.val(), id: c.payload.key}) as Location
        )
      )
    )
  }
  
  retrieveLocations(): Subscription{  // returns Subscription
    return this.retrieveLocationsFromBase().subscribe(data => {
      this.locations = data;
    },
    (error) => {
      console.log(error);
    }) 
  }  
}

