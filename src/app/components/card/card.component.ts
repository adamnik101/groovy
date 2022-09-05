import {Component, Input, OnInit} from '@angular/core';
import {ITrack} from "../../shared/interfaces/i-track";
import {IArtist} from "../../shared/interfaces/i-artist";
import {IAlbum} from "../../shared/interfaces/i-album";
import {AudioService} from "../../shared/services/audio.service";
import {AlbumService} from "../../shared/services/album.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item: ITrack = {} as ITrack
  @Input() artists: IArtist[] = []
  @Input() artist: IArtist = {} as IArtist
  @Input() album: IAlbum = {} as IAlbum
  constructor(private audioService: AudioService) { }

  ngOnInit(): void {
  }
  playTrack(track: ITrack) : void {
    this.audioService.queue.push(track)
    this.audioService.queuePosition = this.audioService.queue.indexOf(track)
    this.audioService.playTrack(track)
  }
  playAlbum(album: IAlbum): void{
    this.audioService.playAlbum(album)
  }
}
