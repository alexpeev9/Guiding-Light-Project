import { ChangeDetectorRef, Component, Injectable, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YaReadyEvent } from 'angular8-yandex-maps';

import { Location } from 'src/app/models/location.model';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { CreateLocationService } from 'src/app/services/location/create-location.service';
@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
})

export class LocationCreateComponent implements OnInit {

  @Input() coordsX!: number;
  @Input() coordsY!: number;
  @Output() validattionMessage!: string;

  submitted = false;
  map?: ymaps.Map;
  crudService!: CrudService<Location>;
  get form() { return this.locationForm.controls; }
  locationForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
    picture: ['', Validators.required]
  });

  constructor(private db: AngularFireDatabase,
    private cdr: ChangeDetectorRef,
    private locationService: CreateLocationService,
    private formBuilder: FormBuilder,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.crudService = new CrudService<Location>("locations", this.db);
  }

  onSubmit(): void {
    if (this.locationForm.invalid) {
      return;
    }
    
    if (!this.locationService.checkIfHasCoords()) {
      this.validattionMessage = "Click on the map to choose a location";
      return;
    }

    this.saveLocation();
  }

  saveLocation(): void {
    this.locationService.bindFormToLocation(
      this.form.title.value,
      this.form.description.value,
      this.form.address.value,
      this.form.picture.value,
      this.authService.userData.email);

      this.crudService.create(this.locationService.location).then(() => {
        this.submitted = true;
      });
  }

  mouseClick(event: YaReadyEvent<ymaps.Map>): void {
    const map = event.target;
    map.events.add('click', (e) => {
      var coords = e.get('coords');
      this.coordsX = coords[0];
      this.coordsY = coords[1];
      this.cdr.detectChanges();
      this.locationService.bindCoordinatesToLocation(coords[0], coords[1]);
    })
  }

}
