import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  public src: string = 'assets/images/author/author.jpg'
  public description: string = 'Hi. I\'m a web developer from Požega, Serbia. Right now I\'m studying Internet Technologies at Information and Communication Technologies College in Belgrade and I\'m pursuing career in Web programming.'
  public name: string = 'Adam Nikolić'
  public title: string = 'About author'
  public brojIndeksa : string = '101'
  public godinaUpisa: string = '19'
  constructor(private pageTitle: Title) { }

  ngOnInit(): void {
    this.pageTitle.setTitle('Groovy - Author')
  }

}
