import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { map } from 'rxjs/operators';

import { Location } from 'src/app/models/location.model';
import { CrudService } from 'src/app/services/crud.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html'
})
export class LocationDetailsComponent implements OnInit, OnChanges {
  
  public errorMessage: string = '';
  id: string ;
  location?: Location;
  crudService: CrudService<Location>;
  console: Console;

  constructor(private db: AngularFireDatabase, private router: Router, private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) {
    this.crudService = new CrudService<Location>("locations",db);
    this.id = this.activeRoute.snapshot.url[1].toString();
    this.console = window.console;
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
    },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }
}
