import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class LocationDetailsComponent implements OnInit, OnDestroy {
  
  @Input() coordX!: number;
  @Input() coordY!: number;
  
  isDataAvailable:boolean = false;
  id!: string;

  constructor(public locationService: LocationService,public authService: AuthService,private db: AngularFireDatabase, private router: Router,private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) {
   }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.url[1].toString();
    this.locationService.retrieveLocationsAsData(this.id)
  }

  public redirectToUpdatePage = (id: any) => {
    const updateUrl: string = `/location-update/${id}`;
    this.router.navigate([updateUrl]);
  }
  
  ngOnDestroy(): void{
    this.locationService.isLoaded = false;
    this.locationService.location = {}; 
  }
}
