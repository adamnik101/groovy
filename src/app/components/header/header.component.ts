import {Component, Input, OnInit} from '@angular/core';
import {IArtist} from "../../shared/interfaces/i-artist";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = ''
  @Input() subtitle: string = ''
  @Input() image: string = ''
  @Input() artist: IArtist = {} as IArtist
  constructor() { }

  ngOnInit(): void {
  }

}
