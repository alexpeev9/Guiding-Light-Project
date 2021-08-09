import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { appInjector } from '../utilities/injector';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  constructor(private router: Router) { }

  public redirectToUpdatePage = (id: any) => {
    const updateUrl: string = `/location-update/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDetailsPage = (id: any) => {
    const detailsURL: string = `/location-details/${id}`;
    this.router.navigate([detailsURL]);
  }
  
  public redirectTo500Page = (id: any) => {
    const detailsURL: string = `/500`;
    this.router.navigate([detailsURL]);
  }

}
