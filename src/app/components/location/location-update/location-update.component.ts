import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { YaReadyEvent } from 'angular8-yandex-maps';

import { CrudService } from 'src/app/services/crud.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Location } from 'src/app/models/location.model';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationBindingService } from 'src/app/services/location/location-binding.service'
import { RedirectService } from 'src/app/services/redirect.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationUpdateComponent implements OnInit {
  pictureURL!: string;
  public errorMessage: string = '';
  id!: string;
  locationBindingService!: LocationBindingService;
  locationService!: LocationService;
  location!: Location;
  crudService!: CrudService<Location>;
  isSubmitted: boolean = false;

  @Output() coordsX?: number;
  @Output() coordsY?: number;

  constructor(private db: AngularFireDatabase,
    private cdr: ChangeDetectorRef,
    private redirectService: RedirectService,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    // private errorHandler: ErrorHandlerService
    private activeRoute: ActivatedRoute) {
    }
    
  get form() { return this.locationForm.controls; }
  locationForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
    picture: ['', Validators.required]
  });
  
  valuechange(value: any) {
    this.locationBindingService.changePicture(value);
  }
  
  ngOnInit(): void {
    this.crudService = new CrudService<Location>("locations", this.db);
    this.locationBindingService = new LocationBindingService;
    this.id = this.activeRoute.snapshot.url[1].toString();
    this.locationService = new LocationService(this.locationBindingService,this.db,this.activeRoute,undefined,this.locationForm)
    this.locationService.retrieveLocationAsForm;
  }

  mouseClick(event: YaReadyEvent<ymaps.Map>): void {
    const map = event.target;
    map.events.add('click', (e) => {
      var coords = e.get('coords');
      this.coordsX = coords[0];
      this.coordsY = coords[1];
      this.locationBindingService.bindCoordinatesToLocation(coords[0], coords[1]);
      this.cdr.detectChanges();
    })
  }

  onSubmit(): void {
    if (this.locationForm.invalid) {
      return;
    }
    this.updateLocation();
    this.redirectService.redirectToDetailsPage(this.id);
  }
  
  updateLocation(): void {
    this.locationBindingService.bindFormToLocation(
      this.form.title.value,
      this.form.description.value,
      this.form.address.value,
      this.form.picture.value,
      this.checkIfSameUser());

    this.locationBindingService.location.id = this.activeRoute.snapshot.url[1].toString();
    this.crudService.update(this.locationBindingService.location.id!, this.locationBindingService.location);
  }

  checkIfSameUser(): string{
    if(this.authService.userData.email == this.locationBindingService.location.author)
    {
      return this.authService.userData.email;
    }
    else
    {
      var newList = this.locationBindingService.location.author += `\n ${this.authService.userData.email}`;
      return newList;
    }
  }
}
