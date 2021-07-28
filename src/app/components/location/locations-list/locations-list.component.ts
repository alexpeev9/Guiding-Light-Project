import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Location } from 'src/app/models/location.model';
import { CrudService } from 'src/app/services/crud.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {

  public errorMessage: string = '';
  locations?: Location[];
  crudService: CrudService<Location>;

  constructor(private db: AngularFireDatabase, private router: Router, private errorHandler: ErrorHandlerService) {
    this.crudService = new CrudService<Location>("locations", db);
  }

  ngOnInit(): void {
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
    const updateUrl: string = `/location-update/${id}`;
    this.router.navigate([updateUrl]);
  }
  public redirectToDetailsPage = (id: any) => {
    const detailsURL: string = `/location-details/${id}`;
    this.router.navigate([detailsURL]);
  }
}
