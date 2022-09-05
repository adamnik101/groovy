import { Component, OnInit } from '@angular/core';
import {IAlbum} from "../../shared/interfaces/i-album";
import {AlbumService} from "../../shared/services/album.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  public title : string = 'Listen to your favorite albums'
  public subtitle: string = 'Find some of the most popular albums'
  public albums : IAlbum[] = []

  constructor(private pageTitle: Title, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe(albums => this.albums = albums)
    this.pageTitle.setTitle('Groovy - Albums')
  }

}
