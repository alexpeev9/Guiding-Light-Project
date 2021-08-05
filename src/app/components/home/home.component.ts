import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CrudService } from 'src/app/services/crud.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { map } from 'rxjs/operators';
import { Location } from 'src/app/models/location.model';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  isShown: boolean = false;
  public errorMessage: string = '';
  crudService: CrudService<Location>;
  locations?: Location[];
  map?: ymaps.Map;
  constructor(private db: AngularFireDatabase, private errorHandler: ErrorHandlerService, private router: Router,@Inject(DOCUMENT) private document: Document) {
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
  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    const objectManagerOptions: ymaps.IObjectManagerOptions = {}
    const objectManager = new ymaps.ObjectManager(objectManagerOptions);
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
          balloonContentHeader: `s`,
          balloonContentBody: `<a href="location-details/${l.id}" ><button>Details</button></a>`,
          hintContent: `${l.title}`
        },
      });
    });
  }
}
