import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { Location } from 'src/app/models/location.model';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
})

export class LocationCreateComponent  {

  @Input() coordX!: number;
  @Input() coordY!: number;

  submitted = false;
  map?: ymaps.Map;
  get form() { return this.locationForm.controls; }
  locationForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
    picture: ['', Validators.required],
    coordX: [undefined, Validators.required],
    coordY: [undefined, Validators.required],
    author: this.authService.userData.email!
  });

  constructor(private cdr: ChangeDetectorRef,
    private crudService: CrudService<Location>,
    private formBuilder: FormBuilder,
    public authService: AuthService) { }


  valuechange(value: any) {
    this.form.picture.setValue(value);
  }

  onSubmit(): void {
    if (this.locationForm.invalid) {
      return;
    }
    //For Testing 
    // var location = new Location;
    // var location = this.locationForm.value as Location;
    // window.console.log(location);
      this.crudService.create(this.locationForm.value as Location).then(() => {
        this.submitted = true;
      });
  }

  mouseClick(event: YaReadyEvent<ymaps.Map>): void {
    const map = event.target;
    map.events.add('click', (e) => {
      var coords = e.get('coords');
      this.coordX = coords[0];
      this.coordY = coords[1];
      this.cdr.detectChanges();
      this.form.coordX.patchValue(coords[0]);
      this.form.coordY.patchValue(coords[1]);
    })
  }

}
