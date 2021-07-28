import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-not-found',
  templateUrl: './error-not-found.component.html',
  styleUrls: ['./error-not-found.component.css']
})
export class ErrorNotFoundComponent implements OnInit {

  public notFoundText: string = `Error 404 Not Found`
  constructor() { }

  ngOnInit(): void {
  }

}
