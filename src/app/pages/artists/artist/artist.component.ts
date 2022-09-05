import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {IArtist} from "../../../shared/interfaces/i-artist";
import {ITrack} from "../../../shared/interfaces/i-track";
import {ActivatedRoute, Router} from "@angular/router";
import {ArtistsService} from "../../../shared/services/artists.service";
import {TracksService} from "../../../shared/services/tracks.service";
import {AudioService} from "../../../shared/services/audio.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  public title: string = ''
  public subtitle: string = ''
  public artist: IArtist = {} as IArtist;
  private id!: number | string
  public tracks : ITrack[] = []
  displayedColumns: string[] = ['#', 'Name', 'Play'];
  dataSource = new MatTableDataSource<ITrack>();
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  constructor(private pageTitle: Title, private route: ActivatedRoute, private router: Router, private artistService: ArtistsService, private trackService: TracksService, private audioService: AudioService) { }

  ngOnInit(): void {
    this.getArtist()
  }

  filtering(ev : Event) {
    const filterValue = (ev.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getArtist(): void{
    this.id= parseInt(this.route.snapshot.paramMap.get('id')!)
    this.artistService.getArtists().subscribe(artists => {
      this.artist = artists.find(artist => artist.id == this.id)!

      if(this.artist == undefined){
        this.router.navigateByUrl('artists')
        return
      }
    }).add(() => {
      if(this.artist == undefined) return
      this.getTracks()
      this.setTitle()
      this.pageTitle.setTitle('Groovy - ' + this.title)
    })
  }
  getTracks() {
    this.trackService.getTracks().subscribe(tracks => {
      this.tracks = tracks.filter(track => track.artistId == this.id)
      this.dataSource = new MatTableDataSource(this.tracks);
      this.dataSource.paginator = this.paginator
    })
  }
  setTitle() {
    this.title = this.artist.name
  }
  playTrack(track: ITrack){
    this.audioService.queue.push(track)
    this.audioService.queuePosition = this.audioService.queue.indexOf(track)
    this.audioService.playTrack(track)
  }
  playTracks(tracks: ITrack[]){
    for (let track of tracks) this.audioService.queue.push(track)
    this.audioService.playTrack(tracks[0])
  }
}
