import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ITrack} from "../../../shared/interfaces/i-track";
import {IAlbum} from "../../../shared/interfaces/i-album";
import {TracksService} from "../../../shared/services/tracks.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlbumService} from "../../../shared/services/album.service";
import {AudioService} from "../../../shared/services/audio.service";
import {IArtist} from "../../../shared/interfaces/i-artist";
import {ArtistsService} from "../../../shared/services/artists.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  title: string = ''
  album: IAlbum = {} as IAlbum
  tracks : ITrack[] = []
  artist: IArtist = {} as IArtist

  displayedColumns: string[] = ['#', 'Name', 'Play'];
  dataSource = new MatTableDataSource<ITrack>();

  constructor(private pageTitle: Title, private route: ActivatedRoute,private router: Router, private trackService: TracksService, private albumService: AlbumService, public audioService : AudioService, private artistService: ArtistsService) { }

  ngOnInit(): void {
    this.getAlbum()
  }
  getAlbum() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.albumService.getAlbums().subscribe(albums => {
      this.album = albums.find(album => album.id == id)!
      if(this.album == undefined) {
        this.router.navigateByUrl('albums')
      }
    })
      .add(() => {
        if(this.album == undefined) return
        this.getTracks()
        this.setTitle()
        this.pageTitle.setTitle('Groovy - ' + this.title)
      })
  }
  getTracks() {
    this.trackService.getTracks().subscribe(tracks => {
      tracks.filter(track => {
        if(this.album.tracks.includes(track.id)){
          this.tracks.push(track)
          this.artistService.getArtists().subscribe(artists =>{
            artists.find(artist => {
              if (artist.id == track.artistId){
                this.artist = artist
              }
            })
          })
        }
      })
      this.dataSource = new MatTableDataSource(this.tracks);
    })
  }
  playTracks() {
    this.audioService.playAlbum(this.album)
  }
  playTrack(track: ITrack) {
    this.audioService.playTrack(track)
  }
  filtering(ev: Event) {
    const filterValue = (ev.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  setTitle() {
    this.title = this.album.name
  }
}
