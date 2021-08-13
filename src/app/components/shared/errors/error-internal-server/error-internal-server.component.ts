import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-internal-server',
  templateUrl: './error-internal-server.component.html',
})
export class ErrorInternalServerComponent implements OnInit {
  public notFoundText: string = `Error 505 Internal Server Error`
  constructor() { }

  ngOnInit(): void {
  }

}
