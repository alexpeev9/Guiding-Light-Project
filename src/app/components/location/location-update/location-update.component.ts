import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { YaReadyEvent } from 'angular8-yandex-maps';

import { CrudService } from 'src/app/services/crud.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Location } from 'src/app/models/location.model';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateLocationService } from 'src/app/services/location/create-location.service';

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
})
export class LocationUpdateComponent implements OnInit {

  public errorMessage: string = '';
  id: string ;
  crudService: CrudService<Location>;
  console: Console;
  loadData: boolean = false;

  constructor(private db: AngularFireDatabase,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder, 
    public authService: AuthService, 
    private router: Router,
    public locationService: CreateLocationService, 
    private activeRoute: ActivatedRoute, 
    private errorHandler: ErrorHandlerService) {
    this.crudService = new CrudService<Location>("locations",db);
    this.id = this.activeRoute.snapshot.url[1].toString();
    this.console = window.console;
   }

   get form() { return this.locationForm.controls; }
   locationForm: FormGroup = this.formBuilder.group({
     title: ['', Validators.required],
     description: ['', Validators.required],
     address: ['', Validators.required],
     picture: ['', Validators.required]
   });
   
  checkIfEmailAndLocationMatch(): boolean{
    setTimeout(function(){},200);
    if(this.authService.userData == undefined)
    {
      return false;
    }
    if(this.locationService.location == undefined)
    {
      return false;
    }
    return this.locationService.location.author == this.authService.userData.email;
  }

  ngOnInit(): void {
    this.retrieveLocation();
  }

  ngOnChanges(): void {
  }

  mouseClick(event: YaReadyEvent<ymaps.Map>): void {
    const map = event.target;
    map.events.add('click', (e) => {
      var coords = e.get('coords');
      this.locationService.location.coordX = coords[0];
      this.locationService.location.coordY = coords[1];
      this.cdr.detectChanges();
      // this.locationService.bindCoordinatesToLocation(coords[0], coords[1]);
    })
  }
  coordsX!: number;
  coordsY!: number;
  deleteLocation(): void{
    this.crudService.delete(this.id).catch(error => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    });
    this.router.navigate(['']);
  }
  retrieveLocation(): void {
    this.crudService.getSingleEl(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.payload.toJSON()
      )
    ).subscribe(data => {
      this.locationService.location = data as Location;
      this.locationForm.patchValue(this.locationService.location);
      this.coordsX!= this.locationService.location.coordX;
      this.coordsY!= this.locationService.location.coordY;
    },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
      this.loadData = true;
      this.locationService.location.id = this.activeRoute.snapshot.url[1].toString();
      
  }

  onSubmit(): void{
    if (this.locationForm.invalid) {
      return;
    }
    this.updateLocation();
  }

  updateLocation(): void {
    // this.locationService.bindCoordinatesToLocation(3,3);
    this.locationService.bindFormToLocation(
      this.form.title.value,
      this.form.description.value,
      this.form.address.value,
      this.form.picture.value,
      this.authService.userData.email);
      
      this.locationService.location.id = this.activeRoute.snapshot.url[1].toString();

      this.console.log(this.locationService.location.id!);
      this.crudService.update(this.locationService.location.id!,this.locationService.location).then(() => {
        this.console.log();
      });
  }
}
