import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { LocationService } from 'src/app/services/location/location.service';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {
  
  @Input() coordX!: number;
  @Input() coordY!: number;
  
  id!: string;
  locationService!: LocationService;

  constructor(public authService: AuthService,private db: AngularFireDatabase, private router: Router,private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) {
   }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.url[1].toString();
    this.locationService = new LocationService(this.db,undefined)
    this.locationService.retrieveLocationsAsData(this.id);
  }

  public redirectToUpdatePage = (id: any) => {
    const updateUrl: string = `/location-update/${id}`;
    this.router.navigate([updateUrl]);
  }
}
