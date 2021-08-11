import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Location } from 'src/app/models/location.model';
import { CrudService } from '../crud.service';
@Injectable({
  providedIn: 'root'
})
export class LocationBindingService {
  
  private crudService!: CrudService<Location>;
  
  constructor( private db: AngularFireDatabase,) {
    this.crudService = new CrudService<Location>(db)
   }

  changePicture(location: Location,value: string)
  {
    location.picture = value;
  }
  bindFormToLocation(location: Location,title: string, description: string, address:string ,picture: string,coordX: number, coordY: number, author: string): void{
    location.title = title;
    location.description = description;
    location.address = address;
    location.picture = picture;
    location.coordX = coordX;
    location.coordY = coordY;
    location.author = author;
  }
  
  bindFormToLocationWithoutAuthor(location: Location, title: string, description: string, address:string ,picture: string, author: string): void{
    location.title = title;
    location.description = description;
    location.address = address;
    location.picture = picture;
    location.author = author;
  }

  bindCoordinatesToLocation(location: Location, coordX: number, coordY: number){
    location.coordX = coordX;
    location.coordY = coordY;
  }
  checkIfHasCoords(location : Location): boolean {
    return location.coordX != null;
  }
  clearLocation(): void{
    this.bindFormToLocationWithoutAuthor({},"","","","","");
  }
}
