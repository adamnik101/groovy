import { Component, OnInit } from '@angular/core';
import {TracksService} from "../../shared/services/tracks.service";
import {AlbumService} from "../../shared/services/album.service";
import {ArtistsService} from "../../shared/services/artists.service";
import {ITrack} from "../../shared/interfaces/i-track";
import {IArtist} from "../../shared/interfaces/i-artist";
import {IAlbum} from "../../shared/interfaces/i-album";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title : string[] = ["Discover new music every day", "Listen to your favorite albums!"]
  subtitle: string[] = ["Start listening to the best new releases now", "Discover and stream a constantly expanding mix of music from the best artists around the world"]
  public tracks: ITrack[] = []
  public artists: IArtist[] = []
  public albums: IAlbum[] = []

  constructor(private pageTitle: Title, private trackService: TracksService, private artistService: ArtistsService, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.trackService.getTracks().subscribe(tracks => this.tracks = tracks.slice(0,5))
    this.artistService.getArtists().subscribe(artists => this.artists = artists)
    this.albumService.getAlbums().subscribe(albums => this.albums = albums)
    this.pageTitle.setTitle('Groovy - Home')
  }

}
