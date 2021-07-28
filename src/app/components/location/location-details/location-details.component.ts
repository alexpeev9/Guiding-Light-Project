import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { YaReadyEvent } from 'angular8-yandex-maps';

import { Location } from 'src/app/models/location.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit, OnChanges {

  @Input() location?: Location;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  crudService: CrudService<Location>;

  constructor(private db: AngularFireDatabase) {
    this.crudService = new CrudService<Location>("locations",db);
   }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }
}
