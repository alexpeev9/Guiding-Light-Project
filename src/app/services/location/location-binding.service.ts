import { Injectable } from '@angular/core';
import { Location } from 'src/app/models/location.model';
@Injectable({
  providedIn: 'root'
})
export class LocationBindingService {

  constructor() {
   }

  changePicture(location: Location,value: string)
  {
    location.picture = value;
  }
  bindFormToLocation(location: Location,title: string, description: string, address:string ,picture: string, author: string): void{
    location.description = description;
    location.address = address;
    location.title = title;
    location.picture = picture;
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
