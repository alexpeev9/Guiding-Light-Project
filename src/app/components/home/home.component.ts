import { ChangeDetectionStrategy, Component, Inject, OnInit,OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CrudService } from 'src/app/services/crud.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Location } from 'src/app/models/location.model';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/services/location/locations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  isShown: boolean = false;
  crudService!: CrudService<Location>;
  locationsService!: LocationsService;
  map!: ymaps.Map;

  constructor(private db: AngularFireDatabase) {
  }
  ngOnInit(): void {
    this.crudService = new CrudService<Location>("locations", this.db);
    this.locationsService = new LocationsService(this.db);
    this.locationsService.retrieveLocations();
  }

  displayMap(){
    if(this.isShown)
    {
      this.isShown = false;
    }
    else
    {
      this.isShown = true;
    }
  }

  ngOnDestroy(): void {
    this.locationsService.locations = [];
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    const objectManagerOptions: ymaps.IObjectManagerOptions = {}
    const objectManager = new ymaps.ObjectManager(objectManagerOptions);
    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    event.target.geoObjects.add(objectManager);
    
    this.locationsService.locations.forEach(l => {
      objectManager.add({
        type: 'Feature',
        id: l.id,
        geometry: {
          type: 'Point',
          coordinates: [l.coordX,l.coordY],
        },
        properties: {
          balloonContentHeader: `<img style="width:200px;height:200px" src=${l.picture}>`,
          balloonContentFooter: `<a href="location-details/${l.id}" ><button>${l.title}</button></a>`,
          
          hintContent: `${l.title}`
        },
      });
    });
  }
}
