import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {AudioService} from "../../shared/services/audio.service";
import {ITrack} from "../../shared/interfaces/i-track";
import {IArtist} from "../../shared/interfaces/i-artist";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({opacity:0, bottom: -100}),
        animate(500, style({opacity:1, bottom: 1}))
      ])
    ])
  ]
})
export class PlayerComponent implements OnInit {

  constructor(public audioService: AudioService) { }

  ngOnInit(): void {
  }

  pauseOrContinueTrack(){
    this.audioService.pauseOrContinueTrack();
  }

  changeVolume(volume: number) {
    this.audioService.changeVolume(volume)
  }

  seekTrack(seek: number){
    this.audioService.seeked(seek)
  }
  seeking(seek: number) {
    this.audioService.seeking(seek)
  }

  nextTrack() {
    if( this.audioService.queuePosition < this.audioService.queue.length - 1){
      this.audioService.queuePosition++
      this.audioService.playQueue(this.audioService.queue)
    }
  }
  previousTrack() {
    if(this.audioService.queuePosition > 0){
      this.audioService.queuePosition--
      this.audioService.playQueue(this.audioService.queue)
    }
  }
}
