import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CrudService } from 'src/app/services/crud.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { map } from 'rxjs/operators';
import { Location } from 'src/app/models/location.model';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public errorMessage: string = '';
  crudService: CrudService<Location>;
  locations?: Location[];
  map?: ymaps.Map;
  constructor(private db: AngularFireDatabase, private errorHandler: ErrorHandlerService, private router: Router,) {
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
  redirectToDetailsPage = (id: any) => {
    const detailsURL: string = `/location-details/${id}`;
    this.router.navigate([detailsURL]);
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    const objectManagerOptions: ymaps.IObjectManagerOptions = {
      // Setting an option to make placemarks start clusterizing.
      clusterize: true,
      // ObjectManager accepts the same options as the clusterer.
      gridSize: 32,
      clusterDisableClickZoom: true,
    };

    const objectManager = new ymaps.ObjectManager(objectManagerOptions);

    /**
     * To set options for single objects and clusters,
     * we refer to child collections of ObjectManager.
     */
    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    event.target.geoObjects.add(objectManager);

    
    this.locations?.forEach(l => {
      objectManager.add({
        type: 'Feature',
        id: l.id,
        geometry: {
          type: 'Point',
          coordinates: [l.coordX,l.coordY],
        },
        properties: {
          balloonContentHeader: `${l.title}`,
          balloonContentBody: `<button (click)="redirectToDetailsPage(${l.id})">Details</button>`,
          hintContent: `${l.title}`
        },
      });
    });
  }
}
