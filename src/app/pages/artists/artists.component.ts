import { Component, OnInit } from '@angular/core';
import {IArtist} from "../../shared/interfaces/i-artist";
import {ArtistsService} from "../../shared/services/artists.service";
import {TracksService} from "../../shared/services/tracks.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  public title: string = 'Explore upcoming artists'
  public subtitle: string = 'Find your favorite artists'
  public artists: IArtist[] = []
  constructor(private pageTitle: Title, private artistsService: ArtistsService, private trackService: TracksService) { }

  ngOnInit(): void {
    this.artistsService.getArtists().subscribe(artists => {
      this.artists = artists
    })
    this.pageTitle.setTitle('Groovy - Artists')
  }
}
