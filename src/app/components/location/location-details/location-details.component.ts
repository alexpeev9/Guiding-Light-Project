import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html'
})
export class LocationDetailsComponent implements OnInit {
  
  public errorMessage: string = '';
  id!: string;
  locationService!: LocationService;

  constructor(private db: AngularFireDatabase, private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) {
   }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.url[1].toString();
    this.locationService = new LocationService(this.db,undefined)
    this.locationService.retrieveLocationsAsData(this.id);
  }

  // deleteLocation(): void{
  //   this.crudService.delete(this.id).catch(error => {
  //     this.errorHandler.handleError(error);
  //     this.errorMessage = this.errorHandler.errorMessage;
  //   });
  //   this.router.navigate(['']);
  // }
}
