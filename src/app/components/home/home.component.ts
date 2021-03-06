import { Component} from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { LocationsService } from 'src/app/services/location/locations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  
  map!: ymaps.Map;

  constructor(public locationsService: LocationsService) {
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
          balloonContentHeader: `${l.title}`,
          balloonContentBody: `<img style="width:190px;height:200px" src=${l.picture}>`,
          // balloonContentFooter: `<a href="location-details/${l.id}" ><button class="btn btn-success">Details</button></a>`, // Won't work for Production
          hintContent: `${l.title}`
        },
      });
    });
  }
}
