import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { YaReadyEvent } from 'angular8-yandex-maps';

import { CrudService } from 'src/app/services/crud.service';
import { Location } from 'src/app/models/location.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RedirectService } from 'src/app/services/redirect.service';
import { LocationService } from 'src/app/services/location/location.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
})
export class LocationUpdateComponent implements OnInit, OnDestroy {

  @Input() coordX!: number;
  @Input() coordY!: number;
  pictureURL!: string;

  @Output()
  get errorMsg() {
    return this.errorMessage;
  }
  errorMessage!: string;
  
  id!: string;
  isSubmitted: boolean = false;

  constructor(private db: AngularFireDatabase,
    private cdr: ChangeDetectorRef,
    private redirectService: RedirectService,
    private formBuilder: FormBuilder,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    public locationService: LocationService,
    private crudService: CrudService<Location>,
    public authService: AuthService,
    private activeRoute: ActivatedRoute) {
  }

  get form() { return this.locationForm.controls; }
  locationForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
    picture: ['', Validators.required],
    author: [undefined,Validators.required],
    coordX: [undefined,Validators.required],
    coordY: [undefined,Validators.required]
  });

  valuechange(value: any) {
    this.form.picture.setValue(value);
  }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.url[1].toString();
    this.locationService.retrieveLocationAsForm(this.id, this.locationForm,this.coordX,this.coordY);
  }

  mouseClick(event: YaReadyEvent<ymaps.Map>): void {
    const map = event.target;
    map.events.add('click', (e) => {
      var coords = e.get('coords');
      this.locationService.location.coordX = coords[0];
      this.locationService.location.coordY = coords[1];
      this.cdr.detectChanges();
      // window.console.log(coords[0]);
      // window.console.log(coords[1]);
      this.form.coordX.patchValue(coords[0]);
      this.form.coordY.patchValue(coords[1]);
    })
  }

  onSubmit(): void {
    this.form.author.patchValue(this.checkIfSameUser());
    if (this.locationForm.invalid) {
      return;
    }
    this.form.coordX.setValue(this.locationService.location.coordX);
    this.form.coordY.setValue(this.locationService.location.coordY);

    this.crudService.update(this.id, this.locationForm.value as Location).then(()=>{
    this.redirectService.redirectToDetailsPage(this.id);
    }).catch((error)=>{
      this.errorHandler.handleError(error);
      this.errorMessage = error.message;
    });
  }

  checkIfSameUser(): string {
    let currentUser: string = this.authService.userData.email;
    let locationAuthor: string | undefined = this.locationService.location.author;
    if (currentUser == locationAuthor) {
      return locationAuthor;
    }
    else {
      if (locationAuthor?.split(' ').includes(currentUser)) {
        return locationAuthor;
      }
      var newList = locationAuthor += `\n ${currentUser}`;
      return newList;
    }
  }

  deleteLocation(): void {
    this.crudService.delete(this.id).then(()=>{
      this.router.navigate(['']);
    }).catch(error => {
      this.errorHandler.handleError(error);
      this.errorMessage = error.message;
    });
  }

  ngOnDestroy(): void{
    this.locationService.isLoaded = false;
    this.locationService.location = {}; 
  }
}
