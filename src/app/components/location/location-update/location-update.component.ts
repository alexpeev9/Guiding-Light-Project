import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Location } from 'src/app/models/location.model';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
})
export class LocationUpdateComponent implements OnInit {

  public errorMessage: string = '';
  id: string ;
  location!: Location;
  crudService: CrudService<Location>;
  console: Console;
  loadData: boolean = false;

  constructor(private db: AngularFireDatabase,private cdr: ChangeDetectorRef,private formBuilder: FormBuilder, public authService: AuthService, private router: Router, private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) {
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
    if(this.location == undefined)
    {
      return false;
    }
    return this.location.author == this.authService.userData.email;
  }
  ngOnInit(): void {
    this.retrieveLocation();
  }

  ngOnChanges(): void {
  }
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
      this.location = data as Location;
      this.locationForm.patchValue(this.location);

    },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
      this.loadData = true;
  }
}
