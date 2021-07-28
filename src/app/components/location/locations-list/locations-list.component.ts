import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { Router, ActivatedRoute } from '@angular/router';

import { Location } from 'src/app/models/location.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent implements OnInit {

  locations?: Location[];
  currentLocation?: Location;
  currentIndex = -1;
  title = '';
  crudService: CrudService<Location>;
  constructor(private db: AngularFireDatabase,private router: Router) {
    this.crudService = new CrudService<Location>("locations",db);
   }

  ngOnInit(): void {
    this.retrievelocations();
  }

  refreshList(): void {
    this.currentLocation = undefined;
    this.currentIndex = -1;
    this.retrievelocations();
  }

  retrievelocations(): void {
    this.crudService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.locations = data;
    });
  }

  setActiveLocation(location: Location, index: number): void {
    this.currentLocation = location;
    this.currentIndex = index;
  }

  removeAllLocations(): void {
    this.crudService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

  public redirectToUpdatePage = (id: any) => { 
    const updateUrl: string = `/location-update/${id}`; 
    this.router.navigate([updateUrl]); 
}

}
