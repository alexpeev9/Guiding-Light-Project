import { ChangeDetectionStrategy, Component} from '@angular/core';
import { Location } from 'src/app/models/location.model';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { Router } from '@angular/router';
import { LocationsService } from 'src/app/services/location/locations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  
  map!: ymaps.Map;

  constructor(public locationsService: LocationsService,private router: Router) {
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
          balloonContentHeader: `<img style="width:190px;height:200px" src=${l.picture}>`,
          balloonContentFooter: `<a href="location-details/${l.id}" ><button>${l.title}</button></a>`,
          
          hintContent: `${l.title}`
        },
      });
    });
  }
}
