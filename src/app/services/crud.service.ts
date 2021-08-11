import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class CrudService<Location> {
  private database;
  private dbPath:string;
  private elementRef: AngularFireList<Location>;

  constructor(db: AngularFireDatabase) { 
    this.database = db;
    this.dbPath = `/locations`;
    this.elementRef = db.list(this.dbPath);
  }
  getSingleEl(id: string): AngularFireObject<Location>{
    let path: string = this.dbPath + `/${id}`;
    return this.database.object(path);
  }
  getAll(): AngularFireList<Location> {
    return this.elementRef;
  }

  create(element: Location): any {
    return this.elementRef.push(element);
  }

  update(id: string, value: any): Promise<void> {
    return this.elementRef.update(id, value);
  }

  delete(id: string): Promise<void> {
    return this.elementRef.remove(id);
  }

  deleteAll(): Promise<void> {
    return this.elementRef.remove();
  }
}
