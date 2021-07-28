import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

export class CrudService<T> {

  private dbPath:string;
  private elementRef: AngularFireList<T>;

  constructor(value: string, db: AngularFireDatabase) { 
    this.dbPath = `/${value}`;
    this.elementRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<T> {
    return this.elementRef;
  }

  create(element: T): any {
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
