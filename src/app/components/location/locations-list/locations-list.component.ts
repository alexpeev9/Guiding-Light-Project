import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Location } from 'src/app/models/location.model';
import { CrudService } from 'src/app/services/crud.service';
import { LocationsService } from 'src/app/services/location/locations.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
})
export class LocationsListComponent implements OnInit {

  locationBindingService! : LocationsService;
  crudService!: CrudService<Location>;
  locations!: any;

  constructor(private db: AngularFireDatabase,private router: Router) {
  }
  
  ngOnInit(): void {
    this.crudService = new CrudService<Location>("locations", this.db);
    this.locationBindingService = new LocationsService(this.db);
    this.locationBindingService.retrieveLocations();
    this.locations = this.locationBindingService.locations;
  }

  public redirectToUpdatePage = (id: any) => {
    const updateUrl: string = `/location-update/${id}`;
    this.router.navigate([updateUrl]);
  }
  public redirectToDetailsPage = (id: any) => {
    const detailsURL: string = `/location-details/${id}`;
    this.router.navigate([detailsURL]);
  }
}
