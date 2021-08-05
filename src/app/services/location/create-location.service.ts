import { Injectable, Output } from '@angular/core';
import { Location } from 'src/app/models/location.model';
@Injectable({
  providedIn: 'root'
})

export class CreateLocationService {
  
  location: Location = {};
  constructor() {
   }
  bindFormToLocation(title: string, description: string, address:string ,picture: string, author: string): void{
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

}
