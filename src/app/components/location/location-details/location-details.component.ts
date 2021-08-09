import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Location } from 'src/app/models/location.model';
import { CrudService } from 'src/app/services/crud.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { LocationBindingService } from 'src/app/services/location/location-binding.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html'
})
export class LocationDetailsComponent implements OnInit {
  
  public errorMessage: string = '';
  id!: string;
  locationBindingService!: LocationBindingService;
  locationService!: LocationService;
  location: Location = {
    id: undefined,
    title : "",
    description : '',
    address: "",
    coordX: undefined,
    coordY: undefined,
  };
  crudService!: CrudService<Location>;

  constructor(private db: AngularFireDatabase, private router: Router, private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) {
   }

  ngOnInit(): void {
    this.crudService = new CrudService<Location>("locations", this.db);
    this.locationBindingService = new LocationBindingService;
    this.id = this.activeRoute.snapshot.url[1].toString();
    this.locationService = new LocationService(this.locationBindingService,this.db,this.activeRoute,this.location,undefined)
    this.locationService.retrieveLocationsAsData;
    // this.location = this.locationBindingService.location;
  }

  // deleteLocation(): void{
  //   this.crudService.delete(this.id).catch(error => {
  //     this.errorHandler.handleError(error);
  //     this.errorMessage = this.errorHandler.errorMessage;
  //   });
  //   this.router.navigate(['']);
  // }
}
