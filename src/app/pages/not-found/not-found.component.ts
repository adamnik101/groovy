import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private pageTitle: Title) { }

  ngOnInit(): void {
    this.pageTitle.setTitle('Groovy - 404 Not found')
  }

}
