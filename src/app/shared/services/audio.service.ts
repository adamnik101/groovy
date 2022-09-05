import { Injectable } from '@angular/core';
import {ITrack} from "../interfaces/i-track";
import {IArtist} from "../interfaces/i-artist";
import {IAlbum} from "../interfaces/i-album";
import {Observable, of} from "rxjs";
import {ArtistsService} from "./artists.service";
import {TracksService} from "./tracks.service";

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  public track : ITrack = {} as ITrack
  public artist: IArtist = {} as IArtist
  public album: IAlbum = {} as IAlbum
  public queue: ITrack[] = []
  public queuePosition: number = 0
  public audio : HTMLAudioElement = new Audio();
  public playing: boolean = false
  public duration: number = 0
  public currentTime : number = 0
  private src : string = ''
  private interval : number = 0;
  constructor(private artistService: ArtistsService, private trackService: TracksService) { }

  //region Playing
  getTrack(track : ITrack): Observable<HTMLAudioElement>{
    this.track = track
    this.artistService.getArtists()
      .subscribe(artists => {
        this.artist = artists.find(artist => artist.id == track.artistId)!
      })
    this.src = track.src
    this.audio.src = this.src
    return of(this.audio);
  }

  playTrack(track: ITrack) {
    this.getTrack(track)
      .subscribe(() => this.startPlaying())
  }
  startPlaying() {
    this.audio.play()

    this.playing = true
    this.audio.oncanplaythrough = () => {
      this.getTrackLength()
      this.interval = setInterval(() => {
        this.getCurrentTime()
      }, 1000)

    }
    this.audio.onended = () => {
      this.playing = false
    }
  }
  pauseOrContinueTrack(): boolean{
    if(this.audio.paused){
      this.startPlaying()
      this.playing = true
      return true
    }
    this.audio.pause()
    this.playing = false
    return false
  }

  getTrackLength() {
    this.duration = this.audio.duration * 1000 // 1 sekund = 1000 milisekundi, formatira  se pomocu date pipe-a unutar komponente
  }

  getCurrentTime() {
    this.currentTime = this.audio.currentTime * 1000
  }
  seeked(seek: number) {
    this.audio.currentTime = seek / 1000
  }
  seeking(seek: number){
    this.currentTime = seek
    clearInterval(this.interval)
    this.interval = 0;
  }
  //endregion
  playAlbum(album: IAlbum): void {
    this.trackService.getTracks().subscribe(tracks => {
      for(let t of album.tracks){
        tracks.find(track => {
          if(track.id == t){
            this.queue.push(track)
          }
        })
      }
      this.queuePosition = this.queue.length - album.tracks.length
      console.log('Queue:',this.queue, 'position: ', this.queuePosition)
      this.playQueue(this.queue)
    })
  }

  playQueue(queue: ITrack[]){
    this.playTrack(queue[this.queuePosition])
    this.audio.onended = () => {
      if( this.queuePosition < queue.length - 1){
        this.queuePosition++
        this.playTrack(queue[this.queuePosition])
      }
    }
  }
  //region Volume
  changeVolume(volume : number){
    this.audio.volume = volume / 100
  }
  //endregion
}
