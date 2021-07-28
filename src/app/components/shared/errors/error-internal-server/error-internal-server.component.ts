import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-internal-server',
  templateUrl: './error-internal-server.component.html',
  styleUrls: ['./error-internal-server.component.css']
})
export class ErrorInternalServerComponent implements OnInit {
  public notFoundText: string = `Error 505 Internal Server Error`
  constructor() { }

  ngOnInit(): void {
  }

}
