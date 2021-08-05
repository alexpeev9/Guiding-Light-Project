import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Location } from 'src/app/models/location.model';
import { CrudService } from 'src/app/services/crud.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { RedirectService } from 'src/app/services/redirect.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
})
export class LocationsListComponent implements OnInit {

  public errorMessage: string = '';
  locations?: Location[];
  crudService!: CrudService<Location>;

  constructor(private db: AngularFireDatabase,private redirectService: RedirectService,private errorHandler: ErrorHandlerService) {
  }
  
  ngOnInit(): void {
    this.crudService = new CrudService<Location>("locations", this.db);
    this.retrieveLocations();
  }

  retrieveLocations(): void {
    this.crudService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.locations = data;
    },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }
  public redirectToUpdatePage = (id: any) => {
     this.redirectService.redirectToUpdatePage(id);
  }
  public redirectToDetailsPage = (id: any) => {
    this.redirectService.redirectToDetailsPage(id);
  }
}
