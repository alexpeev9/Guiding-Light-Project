import { Injectable, Input } from '@angular/core';
import { Location } from 'src/app/models/location.model';
@Injectable({
  providedIn: 'root'
})
export class LocationBindingService {
  location: Location = {};
  // @Input() coordX = this.location.coordX;
  // @Input() coordY = this.location.coordY;
  constructor() {
   }
  changePicture(value: string)
  {
    this.location.picture = value;
  }
  bindFormToLocation(title: string, description: string, address:string ,picture: string, author: string): void{
    this.location.title = title;
    this.location.description = description;
    this.location.address = address;
    this.location.picture = picture;
    this.location.author = author;
  }
  
  bindFormToLocationWithoutAuthor(title: string, description: string, address:string ,picture: string, author: string): void{
    this.location.title = title;
    this.location.description = description;
    this.location.address = address;
    this.location.picture = picture;
    this.location.author = author;
  }

  bindCoordinatesToLocation(coordX: number, coordY:number){
    this.location.coordX = coordX;
    this.location.coordY = coordY;
  }
  checkIfHasCoords(): boolean {
    return this.location.coordX != null;
  }
  clearLocation(): void{
    this.bindFormToLocationWithoutAuthor("","","","","");
  }
}
