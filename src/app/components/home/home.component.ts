import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CrudService } from 'src/app/services/crud.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { map } from 'rxjs/operators';
import { Location } from 'src/app/models/location.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public errorMessage: string = '';
  crudService: CrudService<Location>;
  locations?: Location[];
  constructor(private db: AngularFireDatabase, private errorHandler: ErrorHandlerService) {
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
  
}
