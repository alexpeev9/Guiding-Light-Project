import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { YaEvent, YaReadyEvent } from 'angular8-yandex-maps';

import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

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
  console: Console;
  event: Event | undefined;

  constructor(private db: AngularFireDatabase) {
    this.console = window.console;
    this.event= window.event;
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
    const map = event.target;
    /**
     * Comparing the position calculated from the user's IP address
     * and the position detected using the browser.
     */
    // ymaps.geolocation
    //   .get({
    //     provider: 'yandex',
    //     mapStateAutoApply: true,
    //   })
    //   .then((result) => {
    //     // We'll mark the position calculated by IP in red.
    //     result.geoObjects.options.set('preset', 'islands#redCircleIcon');
    //     // result.geoObjects.options.set('preset','draggable')
    //     // result.geoObjects.get(0).properties.set({
    //     //   balloonContentBody: 'My location',
    //     // });

    //     map.geoObjects.add(result.geoObjects);
    //   });

    ymaps.geolocation
      .get({
        provider: 'browser',
        mapStateAutoApply: true,
      })
      .then((result) => {
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        this.location.coords = result.geoObjects.get(0).geometry?.getBounds()?.pop()?.toString();
        console.log(result.geoObjects.get(0));
        map.geoObjects.add(result.geoObjects);
      });
  }

}
