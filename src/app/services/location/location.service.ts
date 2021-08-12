// import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
// import { map } from 'rxjs/operators';
// import { CrudService } from '../crud.service';
// import { Location } from 'src/app/models/location.model';
// import { LocationBindingService } from './location-binding.service';
// import { FormGroup } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { Observable, Subscription } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LocationService {
//   private crudService!: CrudService<Location>;
//   public isLoaded: boolean = false;
//   public location!: Location;
//   private id!: string;

//   constructor(
//     private db: AngularFireDatabase,
//     private locationForm?: FormGroup) {
//     this.crudService = new CrudService<Location>(db);
//   }

//   retrieveDataFromBase(id: string): Observable<Location>{
//      return this.crudService.getSingleEl(id).snapshotChanges().pipe(
//        map(changes => 
//          changes.payload.toJSON() as Location,
//          ))
//    }

//   retrieveLocationAsForm(locationId: string): void {
//     this.retrieveDataFromBase(locationId).subscribe(data => {
//       this.location = data;
//       this.location.id = locationId;
//       this.isLoaded = true;
//       this.locationForm?.patchValue(this.location);
//     },
//       (error) => {
//         // this.errorHandler.handleError(error);
//         // this.errorMessage = this.errorHandler.errorMessage;
//       });
//   }

//   retrieveLocationsAsData(locationId: string): void {
//     this.retrieveDataFromBase(locationId).subscribe(data => {
//         this.location = data;
//         this.location.id = locationId;
//         this.isLoaded = true;
//     },
//       (error) => {
//         // this.errorHandler.handleError(error);
//         // this.errorMessage = this.errorHandler.errorMessage;
//       });
//       // return this.location;
//   }
// }


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
  public isLoaded: boolean = false;
  public location!: Location;
  private id!: string;

  constructor(
    private db: AngularFireDatabase) {
    this.crudService = new CrudService<Location>(db);
  }

  retrieveDataFromBase(id: string): Observable<Location>{
     return this.crudService.getSingleEl(id).snapshotChanges().pipe(
       map(changes => 
         changes.payload.toJSON() as Location,
         ))
   }

  retrieveLocationAsForm(locationId: string, locationForm: FormGroup,coordX: number,coordY: number): void {
    this.retrieveDataFromBase(locationId).subscribe(data => {
      this.location = data;
      this.location.id = locationId;
      locationForm.patchValue(this.location);
      coordX = this.location.coordX!;
      coordY = this.location.coordY!;
      this.isLoaded = true;
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
        this.isLoaded = true;
    },
      (error) => {
        // this.errorHandler.handleError(error);
        // this.errorMessage = this.errorHandler.errorMessage;
      });
      // return this.location;
  }
}
