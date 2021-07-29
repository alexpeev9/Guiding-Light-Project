import { ChangeDetectorRef, Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
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
  @Input()  coordsX!: string;
  @Input()  coordsY!: string;

  @Output()
  get coordsX1() {
    return this.coordsX;
  }

  map?: ymaps.Map;
  location: Location = new Location();
  submitted = false;
  crudService: CrudService<Location>;
  // console: Console;

  constructor(private db: AngularFireDatabase, private cdr: ChangeDetectorRef) {
    //  this.console = window.console;
     this.crudService = new CrudService<Location>("locations",db);
   }

  ngOnInit():void{}
  saveLocation(): void {
    this.crudService.create(this.location).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  mouseClick(event: YaReadyEvent<ymaps.Map>):void{
    const map = event.target;

    map.events.add('click',(e)=>{
      var coords = e.get('coords');
      
      this.location.coordX = this.coordsX = coords[0];
      this.location.coordY = this.coordsY = coords[1];
      this.cdr.detectChanges()
    })
  }
  newLocation(): void {
    this.submitted = false;
    this.location = new Location();
  }

}
