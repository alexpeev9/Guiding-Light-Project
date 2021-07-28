import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { YaReadyEvent } from 'angular8-yandex-maps';

import { Location } from 'src/app/models/location.model';
import { CrudService } from 'src/app/services/crud.service';
@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class LocationCreateComponent implements OnInit {

  map?: ymaps.Map;
  location: Location = new Location();
  submitted = false;
  crudService: CrudService<Location>;

  constructor(private db: AngularFireDatabase) {
     this.crudService = new CrudService<Location>("locations",db);
   }

  ngOnInit(): void {
  }

  saveLocation(): void {
    this.crudService.create(this.location).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newLocation(): void {
    this.submitted = false;
    this.location = new Location();
  }


  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
  }
}
